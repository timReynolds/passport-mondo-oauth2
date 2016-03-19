/* global describe, it, expect */
/* jshint expr: true */

var MondoStrategy = require('../lib/strategy')
  , chai = require('chai');


describe('Strategy', function() {

  describe('constructed', function() {
    var strategy = new MondoStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, function() {});

    it('should be named mondo', function() {
      expect(strategy.name).to.equal('mondo');
    });
  })

  describe('constructed with undefined options', function() {
    it('should throw', function() {
      expect(function() {
        var strategy = new GoogleStrategy(undefined, function(){});
      }).to.throw(Error);
    });
  })

  describe('authorization request with documented parameters', function() {
    var strategy = new MondoStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, function() {});


    var url;

    before(function(done) {
      chai.passport.use(strategy)
        .redirect(function(u) {
          url = u;
          done();
        })
        .req(function(req) {
          req.session = {};
        })
        .authenticate({ prompt: 'select_account', loginHint: 'john@mail.com', accessType: 'offline' });
    });

    it('should be redirected', function() {
      expect(url).to.equal('https://auth.getmondo.co.uk?response_type=code&redirect_uri=&client_id=ABC123');
    });
  });

});
