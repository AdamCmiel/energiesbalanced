//declare app
var express = require("express");

//required libraries
var fs = require('fs');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var pkg = require('../package.json');
var app = require('../server.js');


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://energiesbalanced.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


app.get('/session', function(req, response){
  response.send({session: req.session});
});

function Fblogin(){}

Fblogin.prototype.login = function(){
  // Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
  app.get('/auth/facebook', passport.authenticate('facebook'));
  // Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { 
    successRedirect: '/',
    failureRedirect: '/login' 
  }));
};

Fblogin.prototype.logout = function(){
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
};

var fblogin = new Fblogin();


module.exports = fblogin;