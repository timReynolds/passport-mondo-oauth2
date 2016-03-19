# passport-mondo-oauth2

[![Build](https://img.shields.io/travis/timReynolds/passport-mondo-oauth2.svg)](https://travis-ci.org/timReynolds/passport-mondo-oauth2)
[![Coverage](https://img.shields.io/coveralls/timReynolds/passport-mondo-oauth2.svg)](https://coveralls.io/r/timReynolds/passport-mondo-oauth2)
[![Dependencies](https://img.shields.io/david/timReynolds/passport-mondo-oauth2.svg)](https://david-dm.org/timReynolds/passport-mondo-oauth2)


[Passport](http://passportjs.org/) strategy for authenticating with [Mondo](http://www.getmondo.co.uk/)
using the OAuth 2.0 API.

This module lets you authenticate using Mondo in your Node.js applications.
By plugging into Passport, Mondo authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-mondo-oauth2

## Usage

#### Create an Application

Before using `passport-mondo-oauth2`, you must register an application with
Mondo.  If you have not already done so, a new project can be created in the
[Mondo Developer site](https://developers.getmondo.co.uk/).
Your application will be issued a client ID and client secret, which need to be
provided to the strategy.  You will also need to configure a redirect URI which
matches the route in your application.

#### Configure Strategy

The Mondo authentication strategy authenticates users using a Mondo account
and OAuth 2.0 tokens.  The client ID and secret obtained when creating an
application are supplied as options when creating the strategy.  The strategy
also requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which contains the authenticated user's
Google profile.  The `verify` callback must call `cb` providing a user to
complete authentication.

    var MondoStrategy = require('passport-mondo').Strategy;

    passport.use(new MondoStrategy({
        clientID: MONDO_CLIENT_ID,
        clientSecret: MONDO_CLIENT_SECRET,
        callbackURL: "http://www.example.com/auth/mondo/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ mondoId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'mondo'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/mondo',
      passport.authenticate('mondo'));

    app.get('/auth/mondo/callback',
      passport.authenticate('mondo', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

Developers using the popular [Express](http://expressjs.com/) web framework can
refer to the example in this repo as a starting point for their own web applications.
You'll need to enter a valid client Id and secret to run the example.

## Contributing

#### Tests

The test suite is located in the `test/` directory.  All new features are
expected to have corresponding test cases.  Ensure that the complete test suite
passes by executing:

```bash
$ make test
```

#### Coverage

Coverage reports can be viewed by executing:

```bash
$ make test-cov
$ make view-cov
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012-2016 Tim Reynolds <[http://timothyreynolds.co.uk](http://timothyreynolds.co.uk)>
