const mongo = require('mongodb');
const {verifyToken} = require("./index");
const mongoose = require('mongoose');

exports.imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}
// exports.imageFilter = imageFilter;


exports.generatePassword = () => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
    for (let i = 1; i <= 8; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char)
    }
    return pass;
}


exports.getObjectIDFromToken = async (req, res) => {
    const r = new Promise(async (resolve, reject) => {
        let token = req.body.token || req.query.token || req.headers['authorization'];
        if (req.headers['authorization']) {
            token = token.split(" ")[1];
        }

        const decodedToken = await verifyToken(token);

        if (!decodedToken) {
            sendError(res, null, 'Invalid access token', 403)
            return resolve(false);
        } else {
            return resolve(mongoose.Types.ObjectId(decodedToken.userid));
        }
    });
    return await r;
}

exports.getEncryptedDataFromJWT = async (req, res) => {
    const r = new Promise(async (resolve, reject) => {
        let token = req.body.token || req.query.token || req.headers['authorization'];
        if (req.headers['authorization']) {
            token = token.split(" ")[1];
        }
        const decodedToken = await verifyToken(token);
        if (!decodedToken) {
            sendError(res, null, 'Invalid access token', 400);
            return resolve(false);
        } else {
            return resolve(decodedToken);
        }
    });
    return await r;
}


global.ValidationError = (error, message = 'Validation error', code = 400) => {
    let e = new Error(message);
    e.code = code;
    e.error = error;
    return e;
}


global.sendData = (res, data, message, code = 200, extra = {}) => {
    let json = {
        ...extra,
        status: 'success',
        message: message || 'Data fetched'
    }
    if (data) json.data = data;
    res.status(code).json(json);
}


global.sendError = (res, error, message, code = 500) => {
    let msg = message;
    try {
        switch (message) {

            case 'Validation error':
                let keys = Object.keys(error);
                msg = error[keys[0]];
                break;

            case 'MongooseError':
                if (error.errors) {
                    let keys = Object.keys(error.errors);
                    msg = error.errors[keys[0]].message;
                }
                break;
        }
    } catch (err) {
        console.error(err);
    }

    let json = {
        status: 'error',
        message: msg || 'Internal server error'
    }
    if (error) json.error = error;
    res.status(code).json(json);
}

global.reverse = (str) => {
    return str.split("").reverse().join("");
}

global.formatCondition = async (condition = {}) => {
    const converted = new Promise((resolve, reject) => {
        let keys = Object.keys(condition);
        for(let i in keys){
            try{
                if (condition[keys[i]].$regex) condition[keys[i]].$regex = new RegExp(condition[keys[i]].$regex, 'i')
            } catch (e) {
                // console.error(e);
                console.log(`Bad value. deleting key '${keys[i]}'`);
                delete condition[keys[i]];
            }
        }

        if(condition._id) {
            if(Array.isArray(condition._id)) {
                for(let i in condition._id) {
                    try {condition._id[i] = mongoose.Types.ObjectId(condition._id[i])} catch(e) {console.error(e)}
                }
                condition._id = {$in: condition._id};
            } else {
                condition._id = mongoose.Types.ObjectId(condition._id);
            }
        }
        return resolve(condition);
    })
    return await converted;
}
 global.convertStringToObjectID = (id)=> {
     if (Array.isArray(id)) {
         for (let i = 0; i < id.length; i++) {
             try {
                 id[i] = new mongo.ObjectID(id[i]);
             } catch (e) {
                 console.error(e);
                 return;
             }
         }
         return id;
     } else {
         return mongoose.Types.ObjectId(id);
     }
 }
