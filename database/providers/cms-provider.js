const {CMS} = require('../models');

exports.get = ()=> CMS.model.findOne();

exports.getOne = (slug)=> CMS.model.findOne({slug: slug})

exports.createMany = (data)=> CMS.model.insertMany(data);

exports.updateCMSPage = (id, data) => CMS.model.findByIdAndUpdate(id, {$set: data});

exports.findAllCMS = ()=> CMS.model.find();

exports.findCMS = (condition) => CMS.model.findOne(condition);
