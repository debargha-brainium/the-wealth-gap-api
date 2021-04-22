const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * OTP Schema
 * @type {module:mongoose.Schema<Document, Model<Document>>}
 */
const OtpSchema = new Schema({

    email: {type: String, required: true},
    otp: {type: String, required: true},
    send_time: {type: String, required: true}

}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

module.exports = {
    model: mongoose.model('otps', OtpSchema)
}