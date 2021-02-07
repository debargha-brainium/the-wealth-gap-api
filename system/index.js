exports.kernel=require('./kernel');
exports.router=require('./router');

// const app = require('../server');
// const middleware = require('./middlewares/index');
// const helpers = require('./utility/helpers');
// var multer = require('multer');
// const {getObjectIDFromToken} = require("../utility/helpers");

// app.post('/upload-profile-image', async function (req, res, next) {
//
//     const id = await getObjectIDFromToken(req, res);
//     if (!id) return;
//
//     req['user'] = {};
//     req.user._id = id;
//     let upload = multer({storage: middleware.profilePhoto, fileFilter: helpers.imageFilter}).single('image');
//
//     upload(req, res, function (err) {
//         if (req.fileValidationError) {
//             return res.status(500).send(req.fileValidationError);
//         } else if (!req.file) {
//             return res.status(500).send('Please select an image to upload');
//         } else if (err instanceof multer.MulterError) {
//             return res.status(500).send(JSON.stringify({status: 'error', msg: 'File upload error'}));
//         } else if (err) {
//             return res.status(500).send(JSON.stringify({status: 'error', msg: 'File upload error'}));
//         }
//         // Display uploaded image for user validation
//         let url = 'customer/profile_images/image_' + id + '.jpeg'
//         res.send(JSON.stringify({status: 'success', msg: 'Profile image updated', data: {url: url}}));
//     })
// });
