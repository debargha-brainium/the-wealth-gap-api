const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

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
    location: {type: String},
    city: {type: String},
    state: {type: String},
    dob: {
        type: Date,
        // max: moment().subtract(1).format('yyyy-mm-dd')
    },
    photo: {type: String, default: ''},
    cover_photo: {type: String, default: ''},
    deleted: {type: Boolean, default: false}
})

// UserSchema.virtual('name').get(function() {
//     return this.firstname + this.lastname;
// })


module.exports = {
    model: mongoose.model('users', UserSchema),
    DTOPropsProfile: '_id firstname lastname user_type photo cover_photo'
}
