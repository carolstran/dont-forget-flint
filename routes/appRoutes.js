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
        res.json({
            id: req.session.user.id,
            firstName: req.session.user.firstName,
            userType: req.session.user.userType,
            hasFilledOutForm: req.session.user.hasFilledOutForm
        });
    });

// router.route('/placeDonation')
//
//     .post(function(req, res) {
//         console.log('This route was hit!');
//         let donationAmount = req.body.donationAmount;
//         let donationFrequency = req.body.donationFrequency;
//         let donorMessage = req.body.donorMessage;
//         let additionalNotes = req.body.additionalNotes;
//
//         console.log('Here is the current user id', req.session.user.id);
//
//         db.insertDonation(req.session.user.id, donationAmount, donationFrequency, donorMessage, additionalNotes)
//         .then(function(result) {
//             console.log('These are the insertDonation DB results', result);
//             res.json({
//                 success: true
//             });
//         }).catch(function(err) {
//             console.log('Error placing donation', err);
//         });
//     });

module.exports = router;
