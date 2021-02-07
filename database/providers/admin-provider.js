const {USER, EMAIL_TEMPLATE} = require('../models');

exports.checkSystemAdminExists = () => USER.model.find({user_type: 'system_admin'}).limit(1).exec();
exports.createSuperSystemAdmin = (profileData) => USER.model.create(profileData);

exports.findUsers = () => USER.model.find().exec();



exports.findEmailTemplates = () => EMAIL_TEMPLATE.model.find();

exports.createEmailTemplates = (emailTemplateData) => EMAIL_TEMPLATE.model.insertMany(emailTemplateData);
