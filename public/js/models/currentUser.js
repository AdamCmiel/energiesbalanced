define(['backbone'], function(Backbone){

	var CurrentUser = Backbone.Model.extend({
		urlRoot: '/api/users/current',
		idAttribute: '_id'
	});
	
	return CurrentUser;
});