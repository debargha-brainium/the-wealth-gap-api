const jwt = require('jsonwebtoken');
// const app = require("../server");
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

exports.createJWT = (data, expiresIn) =>
    jwt.sign(data, process.env.SECRET, {expiresIn: expiresIn || 60 * 60 * 24 * 365});

exports.verifyToken = (token) => {
    // const decodedToken = jwt.verify(token, secret, function (err, decoded) {
    //     // console.log('decoded token', decoded);
    //     if (err)
    //         return false;
    //     else
    //         return decoded;
    // });
    // return decodedToken;
    try {
        return jwt.verify(token, process.env.SECRET)
    } catch (err){
        // console.log(err)
        return 0;
    }
}

exports.encryptPassword = (password) => {
    const algorithm = 'aes-192-cbc';
    const key = crypto.scryptSync(password, 'salt', 24);
    // Use `crypto.randomBytes` to generate a random iv instead of the static iv
    // shown here.
    const iv = Buffer.alloc(16, 0); // Initialization vector.

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
}

exports.decryptPassword = (password, encrypted) => {
    const algorithm = 'aes-192-cbc';
    // const password = 'Password used to generate key';
    // Use the async `crypto.scrypt()` instead.
    const key = crypto.scryptSync(password, 'salt', 24);
    // The IV is usually passed along with the ciphertext.
    const iv = Buffer.alloc(16, 0); // Initialization vector.

    try {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);

        // Encrypted using same algorithm, key and iv.
        // const encrypted = 'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (err) {
        return false;
    }
}


var scanFiles = exports.scanFiles = (folder) => {
    var scripts = [];
    fs.readdirSync(folder).forEach((file) => {
        var f = path.parse(file);
        if (f.ext == ".js") {
            //if(f.name!="index")
            scripts.push(f.name);
        } else if (fs.lstatSync(folder + path.sep + file).isDirectory()) {//if it is a directory, do things recursively
            var subscripts = scanFiles(folder + path.sep + file);
            scripts.push.apply(scripts, subscripts.map(m => file + "/" + m))//using front slash to generalize and to use in routes
        }
    });
    return scripts;
}

const deleteFile = (file) => {
    return new Promise((res, rej) => {
        fs.unlink(appRoot + (file.startsWith("/") ? file : ('/' + file)), (err) => {
            // console.log(err)
            if (err) res(false);
            res(file);
        })
    })
}

// exports.deleteFiles = (files, folder = 'public/uploads/') => {
//     let path_name;
//     if (folder) path_name = folder;
//     if (Array.isArray(files)) {
//         return Promise.all(files.map(f => deleteFile((folder || '') + f)))
//     } else {
//         return deleteFile((folder || '') + files);
//     }
// }

exports.deleteFiles = (files, folder) => {
    try {
        let path_name = folder ? folder : '';
        // if (folder) path_name = folder;
        if (Array.isArray(files)) {
            console.log('Deleting multiple files');
            return Promise.all(files.map(file => deleteFile(path_name + file)))
        } else {
            console.log('Deleting file ', path_name + files);
            return deleteFile(path_name + files);
        }
    } catch (err) {
        console.log('Failed to delete file', err);
    }
}

exports.snakeToCamel = (s) => {
    var ss = s.replace(/(\_\w)/g, function (m) { return m[1].toUpperCase(); });
    return ss[0].toUpperCase() + ss.substr(1);
}
exports.snakeToTitle = (str) => {
    str = str.replace('_', ' ');
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}
