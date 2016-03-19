const express = require('express');
const passport = require('passport');
const MondoStrategy = require('../lib/');

const app = express();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new MondoStrategy({
    clientID: 'oauthclient_000096KFLL8u4OheF797L7',
    clientSecret: 'IF5KVQDrcwIEaU2Ff/3VttN1eG4bo6WNUoCKEFNdEuYgdUXpQ9M1ERvFF/3RUXeJ6GnG8dE8u5/f9dvzyIOe',
    callbackURL: "http://127.0.0.1:3000/auth/mondo/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

app.use(passport.initialize());

app.get('/auth/mondo',
  passport.authenticate('mondo'));

app.get('/auth/mondo/callback',
  passport.authenticate('mondo', { failureRedirect: '/auth/mondo' }),
  function(req, res) {
    res.send(req.user);
  });

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
  console.log('Load http://127.0.0.1:3000/auth/mondo/');
});
