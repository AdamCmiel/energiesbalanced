//app server js file

//declare app
var express = require("express");
var app = express();

//required libraries
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongodb.js');


app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: process.env.SUPER_SECRET_SESSIONS_KEY}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://energiesbalanced.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.get('/session', function(req, response){
  response.send({session: req.session});
});

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

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.use(express.logger());
app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});