Plan for EB app

data structures needed

User
Class
Massage
Session.stored by the browser
ClassBooking
MassageBooking
InAppMessage


User
  name
  facebookLoginCreds

yogaClass
  instructor
  location
  time 
  duration
  style
  suggestedDonation
  participants

Massage
  therapist
  location
  time
  duration
  patient

ClassBooking
  ClassId
  UserId
  Message

MassageBooking
  MassageId
  UserId
  Message

InAppMessage
  sendUserId
  recieveUserId
  Message

PostToFacebook
  userId
  message
  addt'l params?

Requests handled:

CreateUser
  when new user signs into the app via facebook login
UpdateUser
  when existing user updates personal information on EBapp
ReadUser
  when querying user for login
ReadUsers
  when querying users for admin (list of users and current bookings)
DeleteUser
  handled by admin from special request by user.  (have an "are you sure query or someting")

CreateClass
POST /api/yoga_classes

  handled by admin to set schedule
UpdateClass
PUT /api/yoga_classes/:class_id
  //

ReadClass
GET //
  when user querys the class schedule
DeleteClass
DELETE //
  for admin when correcting schedule (perhaps make this a "hide" rather than "destroy")

CreateMassage 
  //
UpdateMassage
  //
ReadMassage
  //
DeleteMassage
  Maybe not necessary

CreateClassBooking
  sends user id, class id to the server to add the user to the existing class
UpdateClassBooking
  change private message
ReadClassBooking
  to list all bookings made by current user and add decoration to classes on schedule when viewed by the user
DeleteClassBooking
  done by user to signify non-attendance

CreateMassageBooking
  //
Update//
  //
Read//
  to list all massage bookings made by the current user
DeleteMassageBooking
  done by user to cancel appointment 


CreateInAppMessage
  send message to Lisa or Todd 
ReadInAppMessage
  returns all message by current UserId
DeleteInAppMessage
  admin only - probably not required

JUNK



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

