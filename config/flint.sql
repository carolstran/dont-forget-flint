DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS donors;
DROP TABLE IF EXISTS recipients;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    user_type VARCHAR(250) NOT NULL
);

CREATE TABLE donors (
    id SERIAL PRIMARY KEY
    user_id INTEGER NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE recipients (
    id SERIAL PRIMARY KEY
    user_id INTEGER NOT NULL REFERENCES users(id),
    family_name VARCHAR(250) NOT NULL,
    family_members INTEGER NOT NULL,
    address VARCHAR(250) NOT NULL,
    image_url TEXT,
    story TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);
