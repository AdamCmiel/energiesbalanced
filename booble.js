var express = require("express");
var app = express();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

app.use(express.cookieParser());
app.use(express.session({secret: process.env.SUPER_SECRET_SESSIONS_KEY}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://energiesbalanced.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    console.log(done);
  }
));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.use(express.logger());
app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});