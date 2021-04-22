const {createJWT, encryptPassword} = require("../utility");
const {user_provider} = require('../database/providers');
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
            sendData(res, insertedData, 'User added', 200,{_accessToken:accessToken});
            await email_service.sendRegistrationEmail(userData.email, userData.firstname);
        } else {
            sendError(res, null, 'Failed to register user');
        }
    } catch (e) {
        // console.log('>>>',e)
        sendError(res, e, 'MongooseError', 200);
    }
}