const express = require('express');
const router = express.Router();

const db = require('../config/db');
const auth = require('../config/auth');

router.route('/register')

    .post(function(req, res) {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let password = req.body.password;
        let userType = req.body.userType;

        if (userType != 'donor' && userType != 'recipient') {
            console.log(userType);
            throw new Error('User must be either a donor or a recipient');
        } else {
            auth.hashPassword(password).then(function(hash) {
                db.registerUser(firstName, lastName, email, hash, userType)
                .then(function(result) {
                    req.session.user = {
                        id: result.id,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        userType: userType
                    };
                    res.json({
                        success: true,
                        userType: userType
                    });
                }).catch(function(err) {
                    console.log('Error registering user', err);
                });
            }).catch(function(err) {
                console.log('Error hashing password', err);
            });
        }
    });

router.route('/submitRecipientInfo')

    .post(function(req, res) {
        let familyName = req.body.familyName;
        let familyMembers = req.body.familyMembers;
        let address = req.body.address;
        let city = req.body.city;
        let state = req.body.state;
        let zipCode = req.body.zipCode;

        db.insertRecipientInfo(familyName, familyMembers, address, city, state, zipCode, req.session.user.id)
        .then(function(result) {
            req.session.user.hasFilledOutForm = true;
            res.json({
                success: true,
                hasFilledOutForm: true
            });
        }).catch(function(err) {
            console.log('Error submitting recipient info', err);
            res.json({
                success: false,
                hasFilledOutForm: false
            });
        });
    });

router.route('/login')

    .post(function(req, res) {
        let email = req.body.email;
        let password = req.body.password;

        db.checkAccount(email, password).then(function(userObj) {
            if (userObj.passwordMatch == true) {
                req.session.user = {
                    id: userObj.userId,
                    firstName: userObj.userFirstName,
                    lastName: userObj.userLastName,
                    email: userObj.userEmail,
                    userType: userObj.userType,
                    imageUrl: userObj.imageUrl,
                    location: userObj.location,
                    familyName: userObj.familyName,
                    story: userObj.story
                };
                if (req.session.user.userType == 'recipient' && userObj.familyName) {
                    req.session.user.hasFilledOutForm = true;
                } else {
                    req.session.user.hasFilledOutForm = false;
                }
                res.json({
                    success: true
                });
            } else if (userObj.passwordMatch == false) {
                res.json({
                    success: false
                });
            }
        }).catch(function(err) {
            console.log('Unable to login user', err);
            res.json({
                success: false
            });
        });
    });

router.route('/logout')

    .get(function(req, res) {
        req.session = null;
        res.json({ success: true });
    });

module.exports = router;
