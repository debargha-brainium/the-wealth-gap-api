const {LANGUAGE}=require('../models');

exports.createLanguage = (data) => LANGUAGE.model.create(data);
exports.updateLanguage = (id, data)=> LANGUAGE.model.findByIdAndUpdate(id, {$set: data});
exports.getAll = (sort, condition={}) => LANGUAGE.model.find(condition).sort(sort);
exports.getOne = (id) => LANGUAGE.model.findById(id);
exports.count = () => LANGUAGE.model.countDocuments();
exports.deleteLanguage = (id) => LANGUAGE.model.findByIdAndUpdate(id, {$set: {deleted: true}});
