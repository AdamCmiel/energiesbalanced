define([
	'jquery',
	'underscore',
	'backbone',
	'models/yogaClass'
], function ($,_,Backbone,YogaClass) {

	var YogaClassView = Backbone.View.extend({
		model: YogaClass,
		tagname: 'li',
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
		},		
		template: _.template($('#classTemplate').html())
	});
 
	return YogaClassView;
});