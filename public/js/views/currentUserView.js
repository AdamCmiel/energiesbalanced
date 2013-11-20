define([
	'jquery',
	'underscore',
	'backbone',
	'jade',
	'models/currentUser'
], function($, _, Backbone, jade, CurrentUser){
  
  var CurrentUserView = Backbone.View.extend({
  	el: $('#currentUser'),
  	initialize: function(){
  		this.render();
  	},
  	render: function(){
  		if(this.model && this.model.attributes.facebook_id){
  			this.$el.html(this.template(this.model.toJSON()));
  		};
  	},
  	template: _.template($('#currentUserTemplate').html())
  })

  return CurrentUserView;
});