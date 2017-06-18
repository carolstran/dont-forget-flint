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

        console.log(userType);

        // if (userType != 'donor' || 'recipient') {
        //     throw new Error('User must be either a donor or a recipient');
        // } else {
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
                        success: true
                    });
                }).catch(function(err) {
                    console.log('Error registering user', err);
                });
            }).catch(function(err) {
                console.log('Error hashing password', err);
            });
        // }
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
            console.log('Result from insertRecipientInfo DB query', result);
            res.json({
                success: true
            });
        }).catch(function(err) {
            console.log('Error submitting recipient info', err);
        });
    });

router.route('/login')

    .post(function(req, res) {
        let email = req.body.email;
        let password = req.body.password;

        db.checkAccount(email, password).then(function(userObj) {
            if (userObj.passwordMatch == true) {
                // NEED TO FIX THIS TO INCLUDE OTHER PROPERTIES
                req.session.user = {
                    id: userObj.userId,
                    firstName: userObj.userFirstName,
                    lastName: userObj.userLastName,
                    email: userObj.userEmail,
                    userType: userObj.userType
                    // imageUrl: userObj.imageUrl,
                    // bio: userObj.bio,
                    // familyName: userObj.familyName,
                    // familyMembers: userObj.familyMembers
                };
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
