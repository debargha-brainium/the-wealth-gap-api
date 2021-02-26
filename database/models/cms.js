const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageContent = new Schema({
    language_id: {type: Schema.Types.ObjectId, required: true},
    content: {type: String}
});
const CMSSchema = new Schema({
    page_name: {type: String, required: true, unique: true},
    slug: {type: String, required: true, unique: true},
    page_content: [PageContent],
    meta_title: {type: String, default: ''},
    meta_description: {type: String, default: ''},
    meta_keywords: {type: String, default: ''},
    status: {type: Boolean, default: true},
    built_in: {type: Boolean, default: true}
})
module.exports = {
    model: mongoose.model('cms', CMSSchema)
}
