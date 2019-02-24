const express = require('express');
const jwt = require('jsonwebtoken');
const key = require('./key');
const fs = require('fs');
const bodyParser = require('body-parser');
const jsonpatch = require('jsonpatch');
const middlewares = require('./middlewares');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/assets', express.static('assets'));
const logger = require('./logger');

app.post('/login',(req,res)=>{
	const username = req.body.username;
	const password = req.body.password;
	if(username==""){
		logger.error('username is requierd');
		res.cookie('auth', '').json({"error":"username is null"});
	}
	else if(password==""){
		logger.error('password is requierd');
		res.cookie('auth', '').json({"error":"password is null"});
	}
	else{
		let token = jwt.sign(username+password, key.secret);
		res.cookie('auth', token).json({
	       "auth":token
	    })
	    logger.info('successfully login and token generate');
	}
});

app.get('/login',middlewares.validity,(req, res)=>{
		let token = req.cookies.auth;
		res.json({"auth":token})
	    logger.info('already login');
})


app.post('/image',middlewares.validity,middlewares.ThumbnailCreation,(req,res)=>{
    logger.info('Successfully downloaded and thumbnail Created and saved in thumnails/images');
	res.json({"success":"Successfully downloaded and thumbnail created"});
	
});

app.get('*', function(req, res){
  logger.error('404 page requested');
  res.send({'error':"invalid url"});
});

app.listen(3000,()=>{
	logger.info("Server running on port 3000")
});

module.exports = app
