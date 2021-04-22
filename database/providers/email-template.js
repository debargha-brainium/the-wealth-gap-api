const {EMAIL_TEMPLATE} = require('../models');

module.exports={
    getEmailTemplateByName: (template_name)=> EMAIL_TEMPLATE.model.findOne({template_name: template_name}),

    findEmailTemplates: () => EMAIL_TEMPLATE.model.find(),

    createEmailTemplates: (emailTemplateData) => EMAIL_TEMPLATE.model.insertMany(emailTemplateData),

}
