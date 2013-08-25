//app server js file

//declare app
var express = require("express");

//required libraries
var fs = require('fs');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
//in app models
var Cat = require('./config/cat.js');

//connect to the database
mongoose.connect(process.env.MONGOHQ_URL);

//declare app variable
var app = express();

app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: process.env.SUPER_SECRET_SESSIONS_KEY}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});



//cat module
app.post('/cats', Cat.create);


//facebook logins
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
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//facebook login module
 
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { 
    successRedirect: '/',
    failureRedirect: '/' 
  })
);

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

//sessions relay
app.get('/session', function(req, response){
  response.send({session: req.session});
});

app.use(express.logger());
app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

//expose app
exports = module.exports = app;