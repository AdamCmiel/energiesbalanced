var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create facebook post model

var facebookPostSchema = new Schema({
    userId: String,
    message: String   
});

var FacebookPost = mongoose.model('FacebookPost', facebookPostSchema);

FacebookPost.create = function(data){
	var newFacebookPost = new FacebookPost(data);
	newFacebookPost.save();
};

FacebookPost.getByUserId = function(req, res){
	FacebookPost.find({userId: req.params.userId}).exec(function(err, postsFound){
		res.send(postsFound);
	});
};

module.exports = FacebookPost;
