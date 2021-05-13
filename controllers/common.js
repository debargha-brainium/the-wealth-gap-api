const {createJWT, encryptPassword, verifyToken} = require("../utility");
const {common_provider, cms_provider, user_provider, language_provider} = require('../database/providers');
const country = require('../assets/country');
const state = require('../assets/state');
const email_service = require('../services/email-service');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const {sendEmailConfirmUser} = require("../services/email-service");
const {deleteFiles} = require('../utility');

exports.login = async (req, res) => {
    console.log('Connecting from', req.ip);
    let {email, password} = req.body;
    const userDetails = await common_provider.getUserByEmail(email.toString().toLocaleLowerCase());
    if (userDetails) {
        password = encryptPassword(password);
        if (userDetails.password === password) {
            const accessToken = await createJWT({
                userid: userDetails._id,
            });
            // userDetails._accessToken = accessToken;
            // console.log(userDetails)
            // delete userDetails.password;
            sendData(res, userDetails, "Login successful", 200, {_accessToken: accessToken});
        } else {
            sendError(res, null, 'Wrong password', 200);
        }
    } else {
        sendError(res, null, "Email ID does not exists", 200);
    }
}


exports.getCountries = async (req, res) => {
    let countries = country.map(item => {
        return {
            country_code: item.iso2, country_name: item.name,
            // states: state.filter(st => st.country_code === item.iso2)
        }
    })
    sendData(res, countries);
}

exports.getStates = async (req, res) => {
    let {country_code} = req.params;
    let states = state.filter(st => st.country_code === country_code);
    sendData(res, states);
}

exports.getCMSDetails = async (req, res) => {
    let {cms_id, page_name} = req.query;
    let condition = {};
    if (!cms_id && !page_name) {
        return sendError(res, null, 'Please pass cms_id or page_name to get cms details', 200);
    }
    if (cms_id) condition._id = cms_id;
    if (page_name) condition.page_name = page_name;
    const cmsDetails = await cms_provider.findCMS(condition);
    sendData(res, cmsDetails);
}

exports.sendResetPasswordEmail = async (req, res) => {
    const {email} = req.query;

    let userDetails = await user_provider.findUserByEmail(email);
    if (!userDetails) {
        return sendError(res, null, 'Email ID not exists', 200);
    }
    let resetPasswordLink = config.website_url + '/reset-password/';
    // resetPasswordLink += jwt.sign({user_id: userDetails._id}, process.env.SECRET, {expiresIn: 60*60*60});
    resetPasswordLink += createJWT({user_id: userDetails._id}, 60 * 60 * 60);
    const mailStatus = await email_service.sendForgotPasswordEmail(email, resetPasswordLink);

    if (mailStatus) {
        sendData(res, null, 'Reset password link sent successfully');
    } else {
        sendError(res, null, 'Mail not sent');
    }
}


exports.resetPassword = async (req, res) => {
    let {token, password} = req.body;

    let tokenData = verifyToken(token);
    if (tokenData && tokenData.user_id) {
        password = encryptPassword(password);
        const updatedData = await user_provider.updatePassword(tokenData.user_id.toString(), password);
        sendData(res, null, updatedData ? 'Password updated successfully' : 'Failed to update password');
    } else
        sendError(res, null, 'Link Expired', 200);

}

exports.sendOTP = async (req, res) => {
    const {email} = req.body;
    // fetch user data
    let userData = await common_provider.getUserByEmail(email);
    if (!userData){
        sendError(res, null, "User with this email id doesn't exists", 200);
        return;
    }
    let otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
    const old = await common_provider.findExistingOTP(email);
    const now = moment().unix();
    if (old && old.send_time + 180 > now) {
        otp = old.otp;
    } else {
        await common_provider.upsertOTP(email, otp, now);
    }
    const verificationEmail = await sendEmailConfirmUser(email, otp);
    sendData(res, {email_status: verificationEmail.response}, 'Email sent successfully in your email id');
};


exports.verifyOTP = async (req, res) => {
    const {email, otp} = req.body;
    const otpData = await common_provider.findExistingOTP(email);

    const now = moment().unix();
    if (otpData && otpData.otp === otp.toString() && now < otpData.send_time + 300) {
        // delete existing otp after successfully verification
        await common_provider.deleteOtp(email);
        // fetch user data
        let userData = await common_provider.getUserByEmail(email);
        // create access token
        const accessToken = await createJWT({
            userid: userData._id,
        });

        sendData(res, userData, 'Otp matched', 200, {_accessToken: accessToken});
    } else {
        sendError(res, null, 'invalid otp', 200);
    }
}

exports.updatePassword = async (req, res) => {
    const userID = req.user.userid;
    const {new_password, confirm_password} = req.body;
    if (confirm_password && new_password !== confirm_password) {
        sendError(res, null, 'new_password and confirm_password value must be same');
    } else {
        let password = encryptPassword(new_password.toString());
        const updatedData = await user_provider.updatePassword(userID, password);
        sendData(res, null, updatedData ? 'Password updated successfully' : 'Failed to update password');
    }
}

exports.changePassword = async (req, res) => {
    const userID = req.user.userid;
    let {old_password, new_password, confirm_password} = req.body;
    if (confirm_password && new_password !== confirm_password) {
        sendError(res, null, 'new_password and confirm_password value must be same');
    } else {
        let userData = await common_provider.getUserByObjectID(userID);

        old_password = encryptPassword(old_password.toString());
        if (old_password === userData.password) {
            new_password = encryptPassword(new_password.toString());
            const updatedData = await user_provider.updatePassword(userID, new_password);
            sendData(res, null, updatedData ? 'Password updated successfully' : 'Failed to update password');
        } else {
            sendError(res, null, 'Old password is not matched with current password', 200);
        }
    }
}


exports.getLanguageList = async (req, res) => {
    let condition = {deleted: false};
    let sort = {name: 1};
    const languages = await language_provider.getAll(sort, condition);
    const totalCount = await language_provider.count();
    sendData(res, languages, 'Data fetched', 200, {count: totalCount});
}

exports.getLanguageDetails = async (req, res) => {
    const languageDetails = await language_provider.getOne(req.params.language_id);
    sendData(res, languageDetails);
}


exports.updateDisplayPicture = async (req, res) => {
    const userID = req.user.userid;
    if (!req.file) {
        sendError(res, null, 'Failed to upload image');
        return;
    }
    const old = await common_provider.getUserByObjectID(userID);
    if (!old) {
        try {
            await deleteFiles(req.file.path);
        } catch (e) {
            console.log(e)
        }
        return;
    }
    let old_file = '';
    if (req.params.type !== 'cover') {
        old_file = old.photo;
    } else {
        old_file = old.cover_photo;
    }
    let data = {};
    if (req.params.type !== 'cover') {
        data.photo = 'display-picture/' + req.file.filename;
    } else {
        data.cover_photo = 'display-picture/' + req.file.filename;
    }
    const editUser = await user_provider.updateUser(userID, data);
    if (editUser) {
        sendData(res, data, 'Data updated');
        if (req.file && old_file) {
            console.log('deleting old file')
            try {
                await deleteFiles(old_file);
            } catch (e) {
                console.log(e)
            }
        }
    } else {
        sendError(res, null, 'Failed to upload image');
        if (req.file) {
            try {
                await deleteFiles(req.file.path);
            } catch (e) {
                console.log(e)
            }
        }
    }
}