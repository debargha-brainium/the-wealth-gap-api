const {common_provider, cms_provider, user_provider} = require("../database/providers");
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
        user_type: 'user',
        mobile: req.body.mobile,
        address: req.body.address
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
        // user_type: 'user',
        mobile: req.body.mobile,
        address: req.body.address
    }

    const {user_id}=req.params;

    try {
        let updatedData = await user_provider.updateUser(user_id, userData);
        sendData(res, updatedData, 'User details updated');
    } catch (e) {
        // console.log('>>>',e)
        sendError(res, e, 'MongooseError', 200);
    }
}

exports.getUserList = async (req, res) => {
    const userID = await verifySystemAdmin(req, res);
    if (!userID) return;
    let userList = await user_provider.findUsers({user_type: {$ne: 'system_admin'}});
    sendData(res, userList);
}

exports.getUserDetails = async (req, res) => {
    const userID = await verifySystemAdmin(req, res);
    if (!userID) return;
    let userDetails = await user_provider.findUserByID(req.query.user_id);
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
        page_name, slug, page_content, meta_title, meta_description, meta_keywords, status, built_in
    } = req.body;
    const {cms_id} = req.params;
    let data = {
        page_name: page_name,
        slug: slug,
        page_content: page_content,
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
