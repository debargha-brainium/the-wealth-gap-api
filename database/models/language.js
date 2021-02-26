const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
    name: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    deleted: {type: Boolean, default: false}
})
module.exports = {
    model: mongoose.model('languages', LanguageSchema)
}
