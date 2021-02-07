const {cms_provider} = require('../providers');
const {cms_contents} = require('../../assets/values');

module.exports = () => {
    return cms_provider.get().then((data) => {
        if (!data) {
            return cms_provider.createMany(cms_contents);
        } else {
            return data;
        }
    }).then().catch((e) => {
        console.log(e);
    })
}
