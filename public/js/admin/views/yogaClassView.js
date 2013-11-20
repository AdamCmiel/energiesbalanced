define([
	'jquery',
	'underscore',
	'backbone'
], function ($,_,Backbone) {

	var YogaClassView = Backbone.View.extend({
		tagname: 'li',
		initialize: function(){
			_.bindAll(this, 'render');
		},
		render: function(){
			return this.template(this.model.attributes);
		},		
		template: _.template($('#classTemplate').html())
	});
 
	return YogaClassView;
});