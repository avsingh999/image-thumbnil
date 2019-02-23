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
app.set('view engine', 'ejs');


app.post('/login',(req,res)=>{
	const username = req.body.username;
	const password = req.body.password;
	if(username==""){
		console.log(username)
		res.cookie('auth', '').json({"error":"username is null"});
	}
	else if(password===""){
		res.cookie('auth', '').json({"error":"password is null"});
	}
	else{
		let token = jwt.sign(username+password, key.secret);
		localStorage.setItem("jwttoken", token);
		res.cookie('auth', token).json({
	       "auth":token
	    })
	}
});

app.get('/login',middlewares.validity,(req, res)=>{
		let token = req.cookies.auth;
		res.json({"auth":token})

})


app.post('/image',middlewares.validity,middlewares.ThumbnailCreation,(req,res)=>{
	res.json({"success":"Successfully downloaded and thumbnail created"});
	
});


app.get('*', function(req, res){
  res.send({'error':"invalid url"});
});


app.listen(3000,()=>{
	console.log("app running on port 3000");
});

module.exports = app
