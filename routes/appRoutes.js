const express = require('express');
const router = express.Router();

const db = require('../config/db');
const multer = require('multer');

// MULTER MIDDLEWARE
var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, `${__dirname}/../uploads`);
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '_' + Math.floor(Math.random() * 99999999) + '_' + file.originalname);
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        filesize: 2097152
    }
});

router.route('/userProfile')

    .get(function(req, res) {
        res.json({
            id: req.session.user.id,
            email: req.session.user.email,
            firstName: req.session.user.firstName,
            lastName: req.session.user.lastName,
            userType: req.session.user.userType,
            imageUrl: req.session.user.imageUrl,
            location: req.session.user.location,
            familyName: req.session.user.familyName,
            story: req.session.user.story,
            hasFilledOutForm: req.session.user.hasFilledOutForm
        });
    });

router.route('/uploadDonorFile')

    .post(uploader.single('file'), function(req, res) {
        let file = `/uploads/${req.file.filename}`;
        req.session.user.imageUrl = file;

        if (req.file) {
            db.updateImageForDonor(req.session.user.id, file).then(function() {
                res.json({
                    success: true,
                    id: req.session.user.id,
                    imageUrl: req.session.user.imageUrl
                });
            }).catch(function(err) {
                console.log('Error uploading profile pic', err);
                res.json({
                    sucess: false
                });
            });
        } else {
            res.json({
                success: false
            });
        }
    });

router.route('/uploadFamilyFile')

    .post(uploader.single('file'), function(req, res) {
        let file = `/uploads/${req.file.filename}`;
        req.session.user.imageUrl = file;

        if (req.file) {
            db.updateImageForFamily(req.session.user.id, file).then(function() {
                res.json({
                    success: true,
                    id: req.session.user.id,
                    imageUrl: req.session.user.imageUrl
                });
            }).catch(function(err) {
                console.log('Error uploading profile pic', err);
                res.json({
                    sucess: false
                });
            });
        } else {
            res.json({
                success: false
            });
        }
    });

module.exports = router;
