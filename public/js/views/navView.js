define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){

	var navItemView = Backbone.View.extend({
		el: $('.mainNav a'),
		events: {
			'click': 'link'
		},
		link: function(e){
			e.preventDefault();
			Backbone.history.redirect(this.)
		}
	})

});