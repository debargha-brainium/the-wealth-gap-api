var multer = require('multer');
var path = require('path');

exports.uploadCategoryImage = multer({
    storage: multer.diskStorage({
        destination: 'public/uploads/category/',
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
}).single('image');