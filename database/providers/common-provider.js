const {USER, EMAIL_TEMPLATE, OTP} = require('../models');

module.exports= {
    getUserByEmail: (email) => USER.model.findOne({email: email}).exec(),

    getUserByObjectID: (userID) => USER.model.findById(userID).exec(),

    getEmailTemplateByName: (template_name) => EMAIL_TEMPLATE.model.findOne({template_name: template_name}),

    findExistingOTP: (email) => OTP.model.findOne({email: email}),
    upsertOTP: (email, otp, send_time) => OTP.model.findOneAndUpdate(
        {email: email},
        {email: email, otp: otp, send_time: send_time},
        {upsert: true}),

    deleteOtp: (email) => OTP.model.deleteMany({email: email}),
}