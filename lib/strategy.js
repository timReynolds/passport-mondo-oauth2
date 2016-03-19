// Load modules.
var OAuth2Strategy = require('passport-oauth2')
  , InternalOAuthError = require('passport-oauth2').InternalOAuthError
  , util = require('util')
  , uri = require('url');

/**
 * `Strategy` constructor.
 *
 * The Mondo authentication strategy authenticates requests by delegating to
 * Mondo using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `cb`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Mondo application's client id
 *   - `clientSecret`  your Mondo application's client secret
 *   - `callbackURL`   URL to which Mondo will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new MondoStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/mondo/callback'
 *       },
 *       function(accessToken, refreshToken, profile, cb) {
 *         User.findOrCreate(..., function (err, user) {
 *           cb(err, user);
 *         });
 *       }
 *     ));
 *
 * @constructor
 * @param {object} options
 * @param {function} verify
 * @access public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://auth.getmondo.co.uk';
  options.tokenURL = options.tokenURL || 'https://api.getmondo.co.uk/oauth2/token';

  OAuth2Strategy.call(this, options, verify);
  this.name = 'mondo';
  this._userProfileURL = options.userProfileURL || 'https://api.getmondo.co.uk/ping/whoami';
}

// Inherit from `OAuth2Strategy`.
util.inherits(Strategy, OAuth2Strategy);

/**
 * Retrieve user profile from Mondo.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `mondo`
 *   - `id`
 *
 *   This is all mondo doesn't provide username or email
 *
 * @param {string} accessToken
 * @param {function} done
 * @access protected
 */
 Strategy.prototype.userProfile = function(accessToken, done) {
   var url = uri.parse(this._userProfileURL).format(url);

   this._oauth2.useAuthorizationHeaderforGET(true);
   this._oauth2.get(url, accessToken, function (err, body, res) {
     if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }

     try {
       var json = JSON.parse(body);

       var profile = { provider: 'mondo' };
       profile.id = json.user_id;
       profile._raw = body;
       profile._json = json;

       done(null, profile);
     } catch(e) {
       done(e);
     }
   });
 }

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
