const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userType = {
    SYSTEM_ADMIN: 'system_admin',
    USER: 'user'
}

const UserSchema = new Schema({
    firstname: {type: String, default: ''},
    lastname: {type: String, default: ''},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    user_type: {
        type: String,
        enum: [userType.SYSTEM_ADMIN, userType.USER],
        default: userType.USER
    },
    mobile: {type: String, default: ''},
    address: {type: String, default: ''},
    photo: {type: String, default: ''},
    cover_photo: {type: String, default: ''},
    deleted: {type: Boolean, default: false}
})
module.exports = {
    model: mongoose.model('users', UserSchema),
    DTOPropsProfile: '_id firstname lastname email user_type photo cover_photo mobile address'
}
