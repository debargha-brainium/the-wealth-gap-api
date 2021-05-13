const {createJWT, encryptPassword} = require("../utility");
const {user_provider, common_provider} = require('../database/providers');
const moment = require('moment');
const email_service = require('../services/email-service');

/**
 * @function signUpUser
 * for user signup
 */
exports.signUpUser = async (req, res) => {
    // const userID = req.user.id;

    let userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: encryptPassword(req.body.password),
        mobile: req.body.mobile,
        location: req.body.location,
        city: req.body.city,
        state: req.body.state,
        dob: req.body.dob
    }

    try {
        let insertedData = await user_provider.createUser(userData);
        if (insertedData) {
            const accessToken = await createJWT({
                userid: insertedData._id,
            });
            sendData(res, insertedData, 'User added', 200, {_accessToken: accessToken});
            await email_service.sendRegistrationEmail(userData.email, userData.firstname);
        } else {
            sendError(res, null, 'Failed to register user');
        }
    } catch (e) {
        // console.log('>>>',e)
        sendError(res, e, 'MongooseError', 200);
    }
}

exports.updateProfile = async (req, res) => {
    const userID = req.user.userid;
    let userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
        location: req.body.location,
        city: req.body.city,
        state: req.body.state,
        dob: req.body.dob
    }

    try {
        let updateData = await user_provider.updateUser(userID, userData);
        sendData(res, null, updateData ? 'User details updated successfully' : 'Failed to update user');
    } catch (e) {
        // console.log('>>>',e)
        sendError(res, e, 'MongooseError', 200);
    }
}

exports.getUserDetails = async (req, res) => {
    const userID = req.user.userid;
    await user_provider.findUserByID(userID).lean().exec((err, data) => {
        if (data.dob) {
            data.dob = moment(data.dob).format('MM-DD-yyyy');
        }
        sendData(res, data);
    });
}


exports.getUserList = async (req, res) => {
    let {page_limit, page_number, search_key} = req.query;
    page_limit = parseInt(page_limit) || 10;
    page_number = parseInt(page_number) || 1;

    let condition = {user_type: {$ne: 'system_admin'}, deleted: false}
    let skip = (page_number - 1) * page_limit;

    let sort = {_id: -1};

    if (search_key) {
        // sort = {firstname: search_key.split('')[0]}

        search_key = new RegExp('^'+search_key, 'i');
        condition.$or = [
            {firstname: search_key},
            {lastname: search_key}
        ]
    }

    let userList = await user_provider.listUsers(page_limit, skip, condition, sort);
    if (userList.length) {
        const totalCount = await user_provider.countUsers(condition);
        sendData(res, userList, 'Data fetched', 200, {count: totalCount});
    } else {
        sendError(res, null, 'No data found', 200);
    }
}