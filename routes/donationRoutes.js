const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.route('/getDonationsMade')

    .post(function(req, res) {
        db.query(req.session.user.id)
        .then(function(results){
            //something!
        })// catch!
    });

router.route('/placeDonation')

    .post(function(req, res) {
        console.log('This route was hit!');
        let donationAmount = req.body.donationAmount;
        let donationFrequency = req.body.donationFrequency;
        let donorMessage = req.body.donorMessage;
        let additionalNotes = req.body.additionalNotes;

        console.log('Here is the current user id', req.session.user.id);

        db.insertDonation(req.session.user.id, donationAmount, donationFrequency, donorMessage, additionalNotes)
        .then(function(result) {
            console.log('These are the insertDonation DB results', result);
            res.json({
                success: true
            });
        }).catch(function(err) {
            console.log('Error placing donation', err);
        });
    });

module.exports = router;
