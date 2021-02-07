const {USER, EMAIL_TEMPLATE} = require('../models');

exports.getUserByEmail = (email) => USER.model.findOne({email: email}).exec();
exports.getUserByObjectID = (userID) => USER.model.findById(userID).exec();

exports.getEmailTemplateByName = (template_name)=> EMAIL_TEMPLATE.model.findOne({template_name: template_name});


