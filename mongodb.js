var mongoose = require('mongoose');

mongoose.connect('mongodb://energiesbalanced.herokuapp.com/test');

var Cat = mongoose.model('Cat', {name: String});

var kitty = new Cat({name: 'Mittens'});
kitty.save(function(err){
	if (err)
		console.log('meow');
});