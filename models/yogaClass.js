var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create class model

var yogaClassSchema = new Schema({
	name: String,
    instructor: String,
    location: String,
    day: String,
    time: String,
    onceOnly: String, 
    duration: String,
    style: String,
    suggestedDonation: String,
    participants: String
});

var YogaClass = mongoose.model('YogaClass', yogaClassSchema);

YogaClass.create = function(req, res){
  var newYogaClass = new YogaClass(req.body);
  newYogaClass.save(function (err){
  	if (err) res.send(err);
  	else res.send({saved: true});
  });
};

YogaClass.getClasses = function(req, res){
	YogaClass.find({}).exec(function (err, classesReturned){
		res.send(classesReturned);
	});
};

YogaClass.getClassesByInstructor = function(req, res){
	YogaClass.find({instructor: req.params.instructor}).exec(function (err, classesReturned){
	res.send(classesReturned);
});
};

YogaClass.getClassesByLocation = function(req, res){
	YogaClass.find({location: req.params.location}).exec(function (err, classesReturned){
	res.send(classesReturned);
});
};

YogaClass.getClassesByDay = function(req, res){
	YogaClass.find({day: req.params.day}).exec(function (err, classesReturned){
	res.send(classesReturned);
});
};

YogaClass.getParticipants = function(req, res){
	YogaClass.find({_id: req.params._id}).exec(function (err, classReturned){
		res.send({'participants': classReturned.participants})
	});
};

YogaClass.updateClass = function(req,res){
//	if (req.params.facebook_id==process.env.admin1 || req.params.facebook_id==process.env.admin2)
	YogaClass.update({_id: req.params._id}, req.params.options);
};

YogaClass.deleteClass = function(req, res){
	YogaClass.remove({_id: req.params.id}, function(err){
		if (!err) res.send({"deleted":true});
	});
};

module.exports = YogaClass;