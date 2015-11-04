'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var baseUrl = 'http://localhost:5678';

describe('server', function() {
  describe('get /time', function() {

    var res;

    before(function(done){
      chai.request(baseUrl).get('/time')
        .then(function(response){
          res = response;
          done();
        })
        .catch(function (err) {
          throw err;
          done();
        });
    });

    it('should be ok', function() {
      var resText = res.text.match
      expect(res, 'status code').to.have.status(200);
    });

    it('should send a date', function() {
      var resText = !!res.text.match(/[MTWFS][a-z]+ [A-Z][a-z]+ \d+ \d{4} \d+:\d+:\d+ GMT-0800 \(PST\)/)
      expect(resText).to.be.ok;
    });

  });

  describe('get /greet/:name', function() {
    var res;

    before(function(done){
      chai.request(baseUrl).get('/greet/Javier')
        .then(function(response){
          res = response;
          done();
        })
        .catch(function (err) {
          res = err;
          done();
        });
    });

    it('should be ok', function() {
      expect(res).to.be.status(200)
    });

    it('should greet :name', function() {
      expect(res.text).to.eql('Hello, Javier')
    })
  });

  describe('POST /greet',function(){
    var res;
    var err;

    before(function(done) {
      chai.request(baseUrl)
        .post('/greet')
        .send({"name":"Javier"})
        .then(function(response) {
          res = response;
          done();
        })
        .catch(function(error) {
          err = error;
          done();
        });
    });

    it('should take a name posted to greet', function(done) {
      expect(err, 'no errors').to.be.undefined;
      expect(res, 'res ok').to.have.status(200);
      done();
    });

    it('should greet name', function() {
      expect(res.text).to.eql('Hello, Javier')
    });

  });
});
