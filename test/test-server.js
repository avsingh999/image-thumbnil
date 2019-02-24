var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
const jwt     = require('jsonwebtoken');
const key = require('../key');
var supertest = require("supertest");
chai.use(chaiHttp);


describe('testing', function() {
  var superset = supertest.agent(server);

  it('should return error', function(done){
  	superset
  	.post('/login')
	.send({'username':'','password':''})
	.end(function(err, res){
		res.should.have.status(200);
		res.should.be.json;
		res.body.should.have.property('error');
		done();
	});
  });

  it('should return error', function(done){
  	superset
  	.post('/login')
	.send({'username':'','password':'mocah@1234'})
	.end(function(err, res){
		res.should.have.status(200);
		res.should.be.json;
		res.body.should.have.property('error');
		done();
	});
  });

  superset = supertest.agent(server);

  it('should Return jwt token  in json /login POST', function(done){
  	superset
  	.post('/login')
	.send({'username':'mocha','password':'mocha@123'})
	.end(function(err, res){
		res.should.have.status(200);
		res.should.be.json;
		res.body.should.have.property('auth');
		done();
	});
  });	

  it('should Return jwt token  in json error', function(done){	
  	superset
  	.get('/login')
  	.end(function(err, res){
		  res.should.have.status(200);
     	  res.should.be.json;
      done();
  	})
  });


  it('Should resize image and store in thumbnails/images return success meassage', function(done){
  	superset
  	.post('/image')
	.send({'url':'http://dailyvocab.com/wp-content/uploads/2014/07/matrimony.jpg'})
	.end(function(err, res){
		res.should.have.status(200);
		res.should.be.json;
		res.body.should.have.property('success');
		done();
	});
  });

  it('should return error File extensions allowed', function(done){
  	superset
  	.post('/image')
	.send({'url':'https://media.giphy.com/media/13gvXfEVlxQjDO/giphy.gif'})
	.end(function(err, res){
		res.should.have.status(200);
		res.should.be.json;
		res.body.should.have.property('error');
		done();
	});
  });


  it('Should return error null url', function(done){
  	superset
  	.post('/image')
	.send({'url':''})
	.end(function(err, res){
		res.should.have.status(200);
		res.should.be.json;
		res.body.should.have.property('error');
		done();
	});
  });

  it('should return error', function(done){
  	superset
  	.post('/login')
	.send({'username':'sdsd','password':''})
	.end(function(err, res){
		res.should.have.status(200);
		res.should.be.json;
		res.body.should.have.property('error');
		done();
	});
  });

    it('should return error for authentication ', function(done){
  	superset
  	.post('/image')
	.send({'url':'http://dailyvocab.com/wp-content/uploads/2014/07/matrimony.jpg'})
	.end(function(err, res){
		res.should.have.status(200);
		res.should.be.json;
		res.body.should.have.property('error');
		done();
	});
  });

    it('should return error ', function(done){
  	superset
  	.get('/invalid-url')
	.end(function(err, res){
		res.body.should.have.property('error');
		done();
	});
  });
});


