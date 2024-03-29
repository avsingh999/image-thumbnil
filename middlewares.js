const path = require('path');
const jwt = require('jsonwebtoken');
const key = require('./key');
const download = require('image-downloader');
const fs = require('fs');
const resizeImg = require('resize-img');
const logger = require('./logger');

/**
 * check validty of user is logged in or not
 * if not then send error
 */
const validity = (req, res, next) => {
    let token = req.cookies.auth;
    if (token) {
        jwt.verify(token, key.secret, function (err, decoded) {
            logger.info("authenication checking")
            next();
        });
    } else {
        logger.error("Authentication requierd")
        res.send({
            "error": 'unauthorized,please login'
        });
    }

};

/**
 * Here is thumbnail create of an image
 *
 */
const ThumbnailCreation = (req, res, next) => {
    let url = req.body.url;
    let ext = path.extname(url);
    if (url === '') {
        logger.error("null url")
        res.json({
            "error": 'null url'
        })
    } else {
        if (ext === '.bmp' || ext === '.jpg' || ext === '.png') {
            const options = {
                url: url,
                dest: './images'
            };

            download.image(options)
                .then(({
                    filename,
                    image
                }) => {
                    logger.info("downloading the image and saved in image folder")
                    resizeImg(fs.readFileSync(filename), {
                        width: 50,
                        height: 50
                    }).then(buf => {
                        fs.writeFileSync("./thumbnails/" + filename, buf);
                        next();
                    })

                })
        } else {
            logger.error("File extensions allowed- [bmp,png,jpg]'});")
            res.json({
                "error": 'File extensions allowed- [bmp,png,jpg]'
            });
        }
    }

};

module.exports.validity = validity;
module.exports.ThumbnailCreation = ThumbnailCreation;