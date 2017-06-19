const express = require('express');
const router = express.Router();

// const db = require('../config/db');
// const multer = require('multer');
//
// // MULTER MIDDLEWARE
// var diskStorage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, `${__dirname}/../uploads`);
//     },
//     filename: function (req, file, callback) {
//         callback(null, Date.now() + '_' + Math.floor(Math.random() * 99999999) + '_' + file.originalname);
//     }
// });
//
// var uploader = multer({
//     storage: diskStorage,
//     limits: {
//         filesize: 2097152
//     }
// });

router.route('/userProfile')

    .get(function(req, res) {
        console.log(req.session.user.hasFilledOutForm);
        res.json({
            id: req.session.user.id,
            firstName: req.session.user.firstName,
            userType: req.session.user.userType,
            hasFilledOutForm: req.session.user.hasFilledOutForm
        });
    });

module.exports = router;
