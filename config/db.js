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

function checkAccount(email, password) {
    let q = `SELECT * FROM users WHERE email = $1;`;
    // NEED TO FIX THIS TO INCLUDE OTHER PROPERTIES
    let params = [
        email
    ];
    return db.query(q, params)
    .then(function(result) {
        if (result.rows && result.rows[0]) {
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
                    userType: result.rows[0].user_type
                    // imageUrl: result.rows[0].image_url,
                    // bio: result.rows[0].bio,
                    // familyName: result.rows[0].familyName,
                    // familyMembers: result.rows[0].familyMembers
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

// EXPORTS
module.exports.registerUser = registerUser;
module.exports.checkAccount = checkAccount;
