const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.route('/getDonationsMade')

    .get(function(req, res) {
        console.log('Get donations made hit!');
        db.getAllDonationsForUser(req.session.user.id)
        .then(function(results) {
            console.log('Results from DB query', results);
            res.json({
                success: true,
                donationsMade: results
            });
        }).catch(function(err) {
            console.log('Error getting donations made', err);
            res.json({
                success: false
            });
        });
    });

router.route('/getDonationsReceived')

    .get(function(req, res) {
        console.log('Get donations received hit!');
        db.getAllDonationAndDonorInfo(req.session.user.id)
        .then(function(results) {
            console.log('Results from DB query', results);
            res.json({
                success: true,
                donationsReceived: results
            });
        }).catch(function(err) {
            console.log('Error getting donations received', err);
            res.json({
                success: false
            });
        });
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
            res.json({
                success: false
            });
        });
    });

module.exports = router;
