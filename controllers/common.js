const {createJWT, encryptPassword, verifyToken} = require("../utility");
const {common_provider, cms_provider, user_provider, language_provider} = require('../database/providers');
const country = require('../assets/country');
const state = require('../assets/state');
const email_service = require('../services/email-service');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    console.log('Connecting from', req.ip);
    let {email, password} = req.body;
    const userDetails = await common_provider.getUserByEmail(email);
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
        sendData(res, null, updatedData?'Password updated successfully': 'Failed to update password');
    } else
        sendError(res, null, 'Link Expired', 200);

}


exports.getLanguageList = async (req, res) => {
    let condition = {deleted: false};
    let sort = {name: 1};
    const languages= await language_provider.getAll(sort, condition);
    const totalCount = await language_provider.count();
    sendData(res,languages, 'Data fetched', 200, {count: totalCount});
}

exports.getLanguageDetails = async (req, res) => {
    const languageDetails = await language_provider.getOne(req.params.language_id);
    sendData(res, languageDetails);
}
