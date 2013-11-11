var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create massage model

var massageSchema = new Schema({
    therapist: String,
    location: String,
    date: Date,
    time: String,
    duration: String,
    patient: String    
});

var Massage = mongoose.model('Massage', massageSchema);

Massage.create = function(data){
  var newMassage = new Massage(data);
  newMassage.save();
};

Massage.getByDate = function(req, res){
  Massage.find({date: req.params.date}).exec(function (err, massagesFound){
    res.send(massagesFound)
  });
};

Massage.getByPatient = function(req, res){
  Massage.find({patient: req.params.patient}).exec(function (err, massagesFound){
    res.send(massagesFound);
  });
};

/*Massage.deleteMassage = function(req, res){
  Massage.delete({_id: req.params._id});
};*/

module.exports = Massage;