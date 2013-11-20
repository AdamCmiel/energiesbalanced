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
      alert('initialize CU view');
  		this.render();
  	},
  	render: function(){
      alert('render CU view');
  		if(this.model && this.model.facebook_id){
  			this.$el.html(this.template(this.model.toJSON()));
  		};
  	},
  	template: _.template($('#currentUserTemplate').html())
  })

  return CurrentUserView;
});