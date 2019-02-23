const path = require('path');
const jwt     = require('jsonwebtoken');
const key = require('./key');
const download = require('image-downloader');
const fs = require('fs');
const resizeImg = require('resize-img');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./jwtoken');



const validity = (req,res,next)=>{
	let token = req.cookies.auth;
	if(token){
		jwt.verify(token, key.secret, function(err, decoded) {
				next();
		});
	}
	else{
		res.send({"error":'unauthorized,please login again'});
	}
	
};


const ThumbnailCreation = (req,res,next)=>{
	let url = req.body.url;
	let ext = path.extname(url);
	if(url==''){
		res.json({"error":'null url'})
	}
	else{
		if(ext === '.bmp' || ext === '.jpg' || ext ==='.png'){
			const options = {
			 url: url,
			 dest: './images'
			};

			download.image(options)
			.then(({ filename, image }) => {
				
				resizeImg(fs.readFileSync(filename), {width:50, height:50}).then(buf => {
					fs.writeFileSync("./thumbnails/"+filename, buf);
				next();
			})

			})
		}
		else{
			res.json({"error":'File extensions allowed- [bmp,png,jpg]'});
		}
	}

};

module.exports.validity = validity;

module.exports.ThumbnailCreation = ThumbnailCreation;