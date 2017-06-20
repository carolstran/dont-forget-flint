const spicedPg = require('spiced-pg');
const dbUrl = require('./passwords.json').dbUrl;
const db = spicedPg(dbUrl);
const auth = require('./auth');

// AUTH FUNCTIONS
function registerUser(first, last, email, hash, userType) {
    let q = `INSERT INTO users (first_name, last_name, email, password_hash, user_type)
             VALUES ($1, $2, $3, $4, $5) RETURNING id;`;

    let params = [
        first,
        last,
        email,
        hash,
        userType
    ];

    return db.query(q, params)
    .then(function(results) {
        return results.rows[0];
    }).catch(function(err) {
        console.log('Error registerUser in DB', err);
        throw err;
    });
}

function insertRecipientInfo(familyName, familyMembers, address, city, state, zipCode, userId) {
    let q = `INSERT INTO recipients (family_name, family_members, address, city, state, zip_code, user_id)
             VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    let params = [
        familyName,
        familyMembers,
        address,
        city,
        state,
        zipCode,
        userId
    ];

    return db.query(q, params)
    .then(function(results) {
        return results;
    }).catch(function(err) {
        console.log('Error insertRecipientInfo in DB', err);
        throw err;
    });
}

function checkAccount(email, password) {
    let q = `SELECT * FROM users
             LEFT JOIN recipients ON users.id = recipients.user_id
             LEFT JOIN donors ON users.id = donors.user_id
             WHERE email = $1;`;
    let params = [
        email
    ];
    return db.query(q, params)
    .then(function(result) {
        if (result.rows && result.rows[0]) {
            console.log(result.rows);
            var hashedPassword = result.rows[0].password_hash;
            return auth.checkPassword(password, hashedPassword)
            .then(function(passwordMatch) {
                if (!passwordMatch) {
                    throw new Error('Boogus credentials');
                }

                let newObj = {
                    passwordMatch: passwordMatch,
                    userId: result.rows[0].id,
                    userEmail: result.rows[0].email,
                    userFirstName: result.rows[0].first_name,
                    userLastName: result.rows[0].last_name,
                    userType: result.rows[0].user_type,
                    imageUrl: result.rows[0].image_url,
                    location: result.rows[0].bio,
                    familyName: result.rows[0].familyName,
                    story: result.rows[0].story
                };
                return newObj;
            }).catch(function(err) {
                throw err;
            });
        } else {
            throw new Error('Account not found');
        }
    }).catch(function(err) {
        console.log('Error checkAccount in DB', err);
        throw err;
    });
}

function insertDonation(id, donationAmount, donationFrequency, donorMessage, additionalNotes) {
    let q = `INSERT INTO donations (donor_id, donation_amount, donation_frequency, donor_message, additional_notes)
             VALUES ($1, $2, $3, $4, $5);`;
    let params = [
        id,
        donationAmount,
        donationFrequency,
        donorMessage,
        additionalNotes
    ];

    return db.query(q, params)
    .then(function(results) {
        console.log('Here are the results from insertDonation DB', results);
        console.log('Here is the results.rows[0]', results.rows[0]);
        return results.rows[0];
    }).catch(function(err) {
        console.log('Error insertDonation in DB', err);
        throw err;
    });
}

function getRecipientIdForDonation(resultFromLastQuery) {
    let q = // something
    let params = [
        resultFromLastQuery
    ];

    return db.query(q, params)
    .then(function(results) {
        console.log('Here are the results.rows of getRecipientIdForDonation', results.rows);
        console.log('Here is the results.rows[0] of getRecipientIdForDonation', results.rows[0]);
        return results.rows[0];
    }).catch(function(err) {
        console.log('Error getRecipientIdForDonation in DB', err);
        throw err;
    });
}

function insertRecipientIdIntoDonation(recipientId, donationId) {
    let q = `INSERT INTO donations
             VALUES ($1) WHERE id = $2;`;
    let params = [
        recipientId,
        donationId
    ];

    return db.query(q, params)
    .then(function(result) {
        console.log('Here is the result from insertRecipientIdIntoDonation', result.rows[0]);
        return result.rows[0];
    }).catch(function(err) {
        console.log('Error insertRecipientIdIntoDonation in DB', err);
        throw err;
    });
}

function getLatestDonation(donorId) {
    let q = `SELECT * FROM donations
             WHERE donor_id = $1;`;
    let params = [
        donorId
    ];

    return db.query(q, params)
    .then(function(results) {
        console.log('Here are the results of getLatestDonation', results);
        return results.rows[0];
    }).catch(function(err) {
        console.log('Error getLatestDonation in DB', err);
        throw err;
    });
}

function getRecipientInfo(recipientId) {
    let q = `SELECT * FROM donations
             LEFT JOIN recipients ON donations.recipient_id = recipients.user_id
             WHERE recipient_id = $1;`;
    let params = [
        recipientId
    ];

    return db.query(q, params)
    .then(function(results) {
        console.log('Results from getRecipientInfo in DB', results);
        return results;
    }).catch(function(err) {
        console.log('Error getRecipientInfo in DB', err);
        throw err;
    });
}

function getAllDonationAndDonorInfo(recipientId) {
    let q = `SELECT * FROM donations
             LEFT JOIN donors ON donations.donor_id = donors.user_id
             WHERE recipient_id = $1;`;
    let params = [
        recipientId
    ];

    return db.query(q, params)
    .then(function(results) {
        console.log('Results from getAllDonationAndDonorInfo in DB', results);
        return results.rows;
    }).catch(function(err) {
        console.log('Error getAllDonationAndDonorInfo in DB', err);
        throw err;
    });
}

function getAllDonationsForUser(donorId) {
    let q = `SELECT * FROM donations
             LEFT JOIN recipients ON donations.recipient_id = recipients.user_id
             WHERE donor_id = $1;`;
    let params = [
        donorId
    ];

    return db.query(q, params)
    .then(function(results) {
        console.log('Results from getAllDonationsForUser', results);
        return results.rows;
    }).catch(function(err) {
        console.log('Error getAllDonationsForUser in DB', err);
        throw err;
    });
}

// EXPORTS
module.exports.registerUser = registerUser;
module.exports.insertRecipientInfo = insertRecipientInfo;
module.exports.checkAccount = checkAccount;
module.exports.insertDonation = insertDonation;
module.exports.getRecipientIdForDonation = getRecipientIdForDonation;
module.exports.insertRecipientIdIntoDonation = insertRecipientIdIntoDonation;
module.exports.getLatestDonation = getLatestDonation;
module.exports.getRecipientInfo = getRecipientInfo;
module.exports.getAllDonationAndDonorInfo = getAllDonationAndDonorInfo;
