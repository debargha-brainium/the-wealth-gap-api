const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CMSSchema = new Schema({
    page_name: {type: String, required: true, unique: true},
    slug: {type: String, required: true, unique: true},
    page_content: {type: String, required: true},
    meta_title: {type: String, default: ''},
    meta_description: {type: String, default: ''},
    meta_keywords: {type: String, default: ''},
    status: {type: Boolean, default: true},
    built_in: {type: Boolean, default: true}
})
module.exports = {
    model: mongoose.model('cms', CMSSchema)
}
