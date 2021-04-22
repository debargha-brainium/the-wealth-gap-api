const {email_provider} = require('../providers');
const {email_templates} = require('../../assets/values');

module.exports = () => {
    return email_provider.findEmailTemplates().then((data) => {
        if (!data.length) {
            return email_provider.createEmailTemplates(email_templates);
        } else {
            return data;
        }
    })
}
