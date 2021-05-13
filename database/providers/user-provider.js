const {USER} = require('../models');


module.exports = {
    createUser: (data) => USER.model.create(data),

    updateUser: (id, data) => USER.model.findByIdAndUpdate(id, {$set: data}),

    deleteUser: (id) => USER.model.findByIdAndUpdate(id, {$set: {deleted: true}}),

    findUsers: (limit, skip, condition = {}) => USER.model.find(condition).sort({_id: -1}).skip(skip).limit(limit),

    findUserByID: (id) => USER.model.findById(id),

    findUserByEmail: (email) => USER.model.findOne({email: email}),

    updatePassword: (user_id, password) =>
        USER.model.findByIdAndUpdate(user_id, {$set: {password: password}}),

    countUsers: (condition = {}) => USER.model.countDocuments(condition),

    listUsers: (limit, skip, condition = {}, sort = {}) => USER.model.find(condition, USER.DTOPropsProfile).sort(sort).skip(skip).limit(limit),

}