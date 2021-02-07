const {encryptPassword} = require("../../utility");
const {admin_provider } = require('../providers');

module.exports = () => {
    return admin_provider.checkSystemAdminExists().then(data=> {
        if (!data.length) {
            let superAdminData = {
                firstname: 'Super',
                lastname: 'System Admin',
                user_type: 'system_admin',
                email: process.env.SUPER_ADMIN_EMAIL,
                password: encryptPassword(process.env.SUPER_ADMIN_PASSWORD),
            }
            return admin_provider.createSuperSystemAdmin(superAdminData);
        }
    })
}
