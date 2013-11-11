var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create in app message model

var inAppMessageSchema = new Schema({
    sendUserId: String,
    receiveUserId: String,
    message: String  
});

var InAppMessage = mongoose.model('InAppMessage', inAppMessageSchema);

InAppMessage.create = function(data){
	var newMessage = new InAppMessage(data);
	newMessage.save();
};

InAppMessage.getBySender = function(req, res){
	InAppMessage.find({sendUserId: req.params.sendUserId}).exec(function (err, messagesFound){
		res.send(messagesFound);
	});
};

InAppMessage.getByRecipient = function(req, res){
	InAppMessage.find({receiveUserId: req.params.sendUserId}).exec(function (err, messagesFound){
		res.send(messagesFound);
	});
};

module.exports = InAppMessage;