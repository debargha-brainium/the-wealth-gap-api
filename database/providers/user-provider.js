const {USER} = require('../models');


exports.createUser = (data) => USER.model.create(data);

exports.updateUser = (id, data) => USER.model.findByIdAndUpdate(id, {$set: data});

exports.findUsers = (condition = {}) => USER.model.find(condition);

exports.findUserByID = (id) =>USER.model.findById(id);

exports.findUserByEmail = (email) =>USER.model.findOne({email: email});

exports.updatePassword = (user_id, password)=>
    USER.model.findByIdAndUpdate(user_id, {$set: {password: password}});
