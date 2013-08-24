//req libs
var mongoose = require('mongoose');

//create class
var Cat = mongoose.model('Cat', { name: String });



Cat.create = function(req, res){
	var name = req.body.name;
	var kitty = new Cat({name: name});
	kitty.save();
	res.send({cat: kitty});
};
/*
app.delete('/cats/all', function(req, res){
	Cat.remove(function(err){
		if (!err){
			console.log('removed');
			return res.send(Cat.find({}));
		}
		else{
			console.log(err);

		}
	});
});

app.delete('/cats/:id', function(req, res){
	Cat.remove({_id:req.params.id},function(err){
		if (!err){
			console.log('removed');
			return res.send(Cat.find({}));
		}
		else{
			console.log(err);

		}
	});
});

app.get('/cats', function(req, res){
	var cats = Cat.find({}).exec(function(err, cats){
		res.send({cats: cats});
	});
});

app.get('/cats/:id', function(req, res){
	var cat = Cat.find({_id:req.params.id}).exec(function(err, cat){
		res.send({cat: cat});
	})
});
*/
exports = module.exports = Cat;

