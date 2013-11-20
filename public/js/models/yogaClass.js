define([
	'jquery',
	'underscore',
	'backbone'
], function ($,_,Backbone) {

	var YogaClass = Backbone.Model.extend({
		urlRoot: '/api/yoga_classes',
		idAttribute: '_id',
		defaults: {
			instructor: 'Lisa',
			location: 'Energies Balanced',
			suggestedDonation: '10',
		}
	});
 
	return YogaClass;
});