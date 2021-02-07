const {admin_provider} = require('../providers');
const {email_templates} = require('../../assets/values');

module.exports = () => {
    return admin_provider.findEmailTemplates().then((data) => {
        if (!data.length) {
            return admin_provider.createEmailTemplates(email_templates);
        } else {
            return data;
        }
    })
}
