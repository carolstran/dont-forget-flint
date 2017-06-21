const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.route('/getDonationsMade')

    .get(function(req, res) {
        db.getAllDonationsForUser(req.session.user.id)
        .then(function(results) {
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
        db.getAllDonationAndDonorInfo(req.session.user.id)
        .then(function(results) {
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
        let donationAmount = req.body.donationAmount;
        let donationFrequency = req.body.donationFrequency;
        let donorMessage = req.body.donorMessage;
        let additionalNotes = req.body.additionalNotes;

        db.insertDonation(req.session.user.id, donationAmount, donationFrequency, donorMessage, additionalNotes)
        .then(function(result) {
            let donationId = result.rows[0].id;
            db.getRecipientIdForDonation()
            .then(function(recipientId) {
                db.putRecipientIdInDonation(recipientId, donationId)
                .then(function(result) {
                    res.json({
                        success: true
                    });
                });
            }).catch(function(err) {
                console.log('Error getting recipient Id for donation', err);
                res.json({
                    success: false
                });
            });
        }).catch(function(err) {
            console.log('Error placing donation', err);
            res.json({
                success: false
            });
        });
    });

router.route('/latestDonation')

    .get(function(req, res) {
        db.getLatestDonation(req.session.user.id)
        .then(function(result) {
            res.json({
                success: true,
                donationAmount: result.donation_amount,
                donationFrequency: result.donation_frequency,
                familyName: result.family_name,
                imageUrl: result.image_url,
                story: result.story
            });
        }).catch(function(err) {
            console.log('Error getting latest donation', err);
            res.json({
                success: false
            });
        });
    });

module.exports = router;
