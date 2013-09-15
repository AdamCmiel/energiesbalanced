//app server js file

//declare app
var express = require("express");

//required libraries
var fs = require('fs');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//in app models
//var Cat = require('./config/cat.js');

//connect to the database
//mongoose.connect(process.env.MONGOHQ_URL);

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

var Data = mongoose.model('Data', {message: String});

Data.create = function(dataIn, callBack){
  var data = new Data(dataIn);
  data.save(callBack);
};

app.post('/data', function(req,res){
  Data.create(req.body, function(err,cbres){
    res.send(cbres);
  });
});

app.get('/data/:message', function(req,res){
  Data.find({message: req.params.message}).exec(function(err,result){
    res.send(result);
  });
});

app.delete('/data/all', function(req,res){
  Data.remove(function(err){
    if (!err){
      console.log('removed')
      return res.send(Data.find({}));
    }
  });
});

var Markup = mongoose.model('Markup', {name: String, markup: String});

Markup.create = function(params, callBack){
  var markup = new Markup(params);
  markup.save(callBack);
};

app.post('/markup', function(req, res){
  console.log(req.body);
  Markup.create(req.body, function(err, cbres){
    console.log(cbres);
    res.send(cbres);
  });
});

app.get('/markup/:id', function(req,res){
  var result = {
      firstName: 'Adam',
      imgUrl: '681333973',
      listItems: [
        {li_class: 'donate',
         li_text: 'Donate to EB'},
         {li_class: 'video',
         li_text: 'Yoga Videos'},
         {li_class: 'locations',
         li_text: 'Our Locations'},
         {li_class: 'massage',
         li_text: 'Book Massage'},
         {li_class: 'schedule',
         li_text: 'Yoga Schedule'},
         {li_class: 'message',
         li_text: 'Leave a message'}
      ]
    };
    res.send(result);
  });
/*
app.get('/markup/nav', function(req, res){
  //Markup.find({name: req.params.name}).exec(function(err, result){
    var result = {
      firstName: 'Adam',
      imgUrl: '681333973',
      listItems: [
        {li_class: 'donate',
         li_text: 'Donate to EB'},
         {li_class: 'video',
         li_text: 'Yoga Videos'},
         {li_class: 'locations',
         li_text: 'Our Locations'},
         {li_class: 'massage',
         li_text: 'Book Massage'},
         {li_class: 'schedule',
         li_text: 'Yoga Schedule'},
         {li_class: 'message',
         li_text: 'Leave a message'}
      ]
    };
    res.send(result);
  //});
});

app.get('/markup', function(req, res){
  Markup.find({}).exec(function(err, result){
    res.send(result);
  });
});

*/

app.delete('/markup/all', function(req, res){
  Markup.remove(function(err){
    if (!err){
      console.log('removed');
      return res.send(Data.find({}));
    }
  })
});

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

//create user model
var userSchema = new Schema({
    facebook_id: String,
    first_name: String,
    last_name: String,
    fb_username: String,
    time_created: Date,
});

var User = mongoose.model('User', userSchema);


User.create = function(data){
  var keep_data={
    facebook_id: data.id,
    first_name: data.name.givenName,
    last_name: data.name.familyName,
    fb_username: data.username,
    time_created: new Date(),
  };
  var newUser = new User(keep_data);
  newUser.save();
};

User.currentUser = function(session){
  console.log('User' + session.passport.user);
  User.find({facebook_id: session.passport.user}).limit(1).exec(function(err, users) {
    if (err) return null
    if (users.length == 1) {
      return users[0]
    } else {
      return null
    }
  });
};

app.delete('/users/all', function(req, res){
  User.remove(function(err){
    if (!err){
      console.log('removed');
      return res.send(User.find({}));
    }
    else{
      console.log(err);

    }
  });
});

app.get('/users', function(req, res){
  var users = User.find({}).exec(function(err, users){
    res.send({users: users});
  });
});

app.get('/users/:facebook_id', function(req, res){
  var user = User.find({facebook_id: req.params.facebook_id}).exec(function(err,userFound){
     res.send({user: userFound});
  });
});

passport.serializeUser(function(user, done) {
  User.find({ 'facebook_id': user.id }).limit(1).exec(function (err, dbUsers) {

    // on no record found create user
    if (dbUsers.length < 1 || err) {
      user = User.create(user);
      done(null, user.id);
      console.log(err);
    } else {
      done(null, dbUsers[0]);
    };
  });
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
    successRedirect: '/nav',
    failureRedirect: '/' 
  })
);

//check to see if user is signed in
/*
app.get('/', function(req, res){
  var user_id = req.session.passport.user;
  console.log(user_id);
  var is_user = User.is_user(user_id);
  if (is_user)
    res.redirect('/welcome/lisa');
});
*/
app.get('/welcome/lisa', function(req, res){
  console.log(req.query);
  Data.find({message: req.query.message}).exec(function(err,cbres){
    res.send(cbres[0]);
  });
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

//sessions relay
app.get('/session', function(req, response){
  response.send({
    session: req.session,
    currentUser: User.currentUser(req.session)
  });
});

app.use(express.logger());
app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
//expose app
exports = module.exports = app;