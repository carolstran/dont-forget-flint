DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS donors;
DROP TABLE IF EXISTS recipients;
DROP TABLE IF EXISTS donations;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    user_type VARCHAR(250) NOT NULL,
    CHECK (user_type == 'donor' OR 'recipient')
);

CREATE TABLE donors (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    image_url TEXT,
    location TEXT
);

CREATE TABLE recipients (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    family_name VARCHAR(250) NOT NULL,
    family_members INTEGER NOT NULL,
    address VARCHAR(250) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code INTEGER NOT NULL,
    image_url TEXT,
    story TEXT
);

CREATE TABLE donations (
    id SERIAL PRIMARY KEY,
    donor_id INTEGER NOT NULL REFERENCES users(id),
    recipient_id INTEGER NOT NULL,
    donation_amount INTEGER NOT NULL,
    donation_frequency VARCHAR(250) NOT NULL,
    donor_message TEXT,
    additional_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
