const {common_provider, cms_provider, user_provider, language_provider} = require("../database/providers");
const {deleteFiles, encryptPassword} = require("../utility");
const {getObjectIDFromToken} = require("../utility/helpers");


const verifySystemAdmin = async (req, res) => {
    const id = await getObjectIDFromToken(req, res);
    if (!id) return false;
    const userDetails = await common_provider.getUserByObjectID(id);
    if (userDetails && userDetails.user_type === 'system_admin')
        return id;
    else {
        if (req.file) {
            try {
                await deleteFiles(req.file.path);
            } catch (e) {
                console.log(e)
            }
        }
        sendError(res, null, 'Access Denied', 403);
        return false;
    }
}


/**
 * @function addUser
 * for user signup
 */
exports.addUser = async (req, res) => {
    const userID = await verifySystemAdmin(req, res);
    if (!userID) return;

    let userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: encryptPassword(req.body.password),
        mobile: req.body.mobile,
        location: req.body.location,
        city: req.body.city,
        state: req.body.state,
        dob: req.body.dob
    }

    try {
        let insertedData = await user_provider.createUser(userData);
        sendData(res, insertedData, 'User added');
    } catch (e) {
        // console.log('>>>',e)
        sendError(res, e, 'MongooseError', 200);
    }
}

exports.editUser = async (req, res) => {
    const userID = await verifySystemAdmin(req, res);
    if (!userID) return;

    let userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        // email: req.body.email,
        // password: encryptPassword(req.body.password),
        mobile: req.body.mobile,
        location: req.body.location,
        city: req.body.city,
        state: req.body.state,
        dob: req.body.dob
    }

    const {user_id} = req.params;

    try {
        let updatedData = await user_provider.updateUser(user_id, userData);
        sendData(res, updatedData, 'User details updated');
    } catch (e) {
        // console.log('>>>',e)
        sendError(res, e, 'MongooseError', 200);
    }
}

exports.deleteUser = async (req, res) => {
    const userID = await verifySystemAdmin(req, res);
    if (!userID) return;
    try {
        let deletedUser = await user_provider.deleteUser(req.params.user_id);
        if (deletedUser)
            sendData(res, deletedUser, 'User deleted');
        else
            sendError(res, null, 'Delete Failed', 200);
    } catch (e) {
        // console.log('>>>',e)
        sendError(res, e, 'MongooseError', 200);
    }
}
exports.getUserList = async (req, res) => {
    const userID = await verifySystemAdmin(req, res);
    if (!userID) return;

    let {page_limit, page_number, search_key} = req.query;
    page_limit = parseInt(page_limit) || 10;
    page_number = parseInt(page_number) || 1;

    let condition = {user_type: {$ne: 'system_admin'}, deleted: false}
    let skip = (page_number - 1) * page_limit;

    if (search_key) {
        condition.$or = [
            {firstname: search_key},
            {lastname: search_key},
            {email: search_key},
            {mobile: search_key},
            {state: search_key},
        ]
    }

    let userList = await user_provider.findUsers(page_limit, skip, condition);
    if (userList.length) {
        const totalCount = await user_provider.countUsers(condition);
        sendData(res, userList, 'Data fetched', 200, {count: totalCount});
    } else {
        sendError(res, null, 'No data found', 200);
    }
}

exports.getUserDetails = async (req, res) => {
    const userID = await verifySystemAdmin(req, res);
    if (!userID) return;
    let userDetails = await user_provider.findUserByID(req.params.user_id);
    sendData(res, userDetails);
}

exports.listCMS = async (req, res) => {
    const userID = await verifySystemAdmin(req, res);
    if (!userID) return;
    let cmsList = await cms_provider.findAllCMS();
    sendData(res, cmsList);
}

exports.editCMSPage = async (req, res) => {
    const userID = await verifySystemAdmin(req, res);
    if (!userID) return;
    let {
        page_name, slug, meta_title, meta_description, meta_keywords, status, built_in,
        language_id, content
    } = req.body;
    const {cms_id} = req.params;
    let data = {
        page_name: page_name,
        slug: slug,
        page_content: {
            language_id: language_id,
            content: content
        },
        meta_title: meta_title,
        meta_description: meta_description,
        meta_keywords: meta_keywords,
        status: status,
        built_in: built_in
    }
    try {
        const updatedData = await cms_provider.updateCMSPage(cms_id, data);
        sendData(res, updatedData, 'CMS Updated');
    } catch (e) {
        // console.log('>>>',e)
        sendError(res, e, 'MongooseError', 200);
    }
    // const updatedData = await cms_provider.updateCMSPage(cms_id, data);
    // if (updatedData)
    //     sendData(res, updatedData, 'CMS Updated');
    // else
    //     sendError(res, null, 'Failed to update CMS');
}


exports.addLanguage = async (req, res) => {
    const userID = await verifySystemAdmin(req, res);
    if (!userID) return;
    const {name, code} = req.body;
    let data = {name: name, code: code};
    try {
        const insertedData = await language_provider.createLanguage(data);
        sendData(res, insertedData, 'Language Inserted');
    } catch (e) {
        sendError(res, e, 'MongooseError', 200);
    }
}

exports.updateLanguage = async (req, res) => {
    const userID = await verifySystemAdmin(req, res);
    if (!userID) return;
    const {name, code} = req.body;
    let data = {name: name, code: code};
    let {language_id} = req.params;
    try {
        const updatedData = await language_provider.updateLanguage(language_id, data);
        sendData(res, updatedData, 'Language updated');
    } catch (e) {
        sendError(res, e, 'MongooseError', 200);
    }
}

exports.deleteLanguage = async (req, res) => {
    const userID = await verifySystemAdmin(req, res);
    if (!userID) return;
    let {language_id} = req.params;
    try {
        const deletedData = await language_provider.deleteLanguage(language_id);
        sendData(res, deletedData, 'Language deleted');
    } catch (e) {
        sendError(res, e, 'MongooseError', 200);
    }
}
