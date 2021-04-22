const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateName = {
    forgot_password: 'Forgot-Password',
    registration: 'Registration',
    account_verification: 'Account-Verification'
}

const EmailTemplateSchema = new Schema({
    template_name: {type: String, required: true, unique: true},
    content: {type: String, required: true}
})
module.exports = {
    model: mongoose.model('email_templates', EmailTemplateSchema),
    template: templateName
}
