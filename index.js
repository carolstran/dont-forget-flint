const express = require('express');
const app = express();

const db = require('./config/db');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

// STATIC DIRECTORIES
app.use('/public', express.static(`${__dirname}/public`));
app.use('/uploads', express.static(`${__dirname}/uploads`));

// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// COOKIE SESSION MIDDLEWARE
app.use(cookieSession({
    secret: '5bY374LfDr',
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

// REQUIRE BUILD.JS
if (process.env.NODE_ENV != 'production') {
    app.use(require('./build'));
}

// ROUTERS
// app.use(require('./routes/appRoutes'));
app.use(require('./routes/authRoutes'));

// CATCHALL ROUTE
app.get('*', function(req, res) {
    if (!req.session.user && req.url != '/welcome') {
        return res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

// SERVER
app.listen(8080, function() {
    console.log("Listening on 8080");
});
