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
  		this.model.on('change', this.render, this); 
  	},
  	render: function(){
      console.log(this.model.toJSON());
    	this.$el.html(this.template(this.model.toJSON()));
  	},
  	template: _.template($('#currentUserTemplate').html())
  })

  return CurrentUserView;
});