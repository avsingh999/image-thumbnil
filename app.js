const express = require('express');
const jwt = require('jsonwebtoken');
const key = require('./key');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/assets', express.static('assets'));
const logger = require('./logger');

/**
 * enable cross-origin resource sharing (CORS) in the express.js framework on node.js
 *
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

/**
 * create login request to server
 * username
 * password
 */
app.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body;
    if (username === '') {
        logger.error('username is requierd');
        res.cookie('auth', '').json({
            error: 'username is null',
        });
    } else if (password === '') {
        logger.error('password is requierd');
        res.cookie('auth', '').json({
            error: 'password is null',
        });
    } else {
        const token = jwt.sign(username + password, key.secret);
        res.cookie('auth', token).json({
            auth: token,
        });
        logger.info('successfully login and token generate');
    }
});


/**
 * if user is already login then this will return token
 *
 */
app.get('/login', middlewares.validity, (req, res) => {
    const token = req.cookies.auth;
    res.json({
        auth: token,
    });
    logger.info('already login');
});


/**
 * send image url to server and image will be download in image folder and thumbnail
 * will create and saved in thumbnail/image folder
 * first check token validty
 * then create thumbanil
 */
app.post('/image', middlewares.validity, middlewares.ThumbnailCreation, (req, res) => {
    logger.info('Successfully downloaded and thumbnail Created and saved in thumnails/images');
    res.json({
        success: 'Successfully downloaded and thumbnail created',
    });
});

/**
 * if type another url then show 404 page not found error
 *
 */
app.get('*', (req, res) => {
    logger.error('404 page requested');
    res.send({
        error: 'invalid url',
    });
});

app.listen(3000, () => {
    logger.info('Server running on port 3000');
});

module.exports = app;