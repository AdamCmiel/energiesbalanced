define(['backbone'], function(Backbone){
	var currentUser = Backbone.Model.extend({
		urlRoot: '/api/users/current',

	})


});