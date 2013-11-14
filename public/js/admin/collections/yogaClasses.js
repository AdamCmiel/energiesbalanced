define([
	'jquery',
	'underscore',
	'backbone',
	'models/yogaClass'
], function ($,_,Backbone,YogaClass) {

	var YogaClasses = Backbone.Collection.extend({
		model: YogaClass,
		url: '/api/yoga_classes'
	});
 
	return YogaClasses;
});