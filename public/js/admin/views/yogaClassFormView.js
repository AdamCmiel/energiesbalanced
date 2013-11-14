define([
	'jquery',
	'underscore',
	'backbone',
	'models/yogaClass'
], function ($,_,Backbone,YogaClass) {

	var YogaClassFormView = Backbone.View.extend({
		model: YogaClass,
		el: '.rightSidebar',
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
		},
		template: _.template($('#classInputTemplate').html()),
		events: {
			'submit': 'save'
		},
		save: function(e) {
			e.preventDefault();
			var className = 		this.$('input[name="name"]').val();
			var location = 			this.$('#locationSelector').val();
			var instructor = 		this.$('#instructorSelector').val();
			var day = 				this.$('#daySelector').val();
			var time = 				this.$('#hourSelector').val()+this.$('#quarterSelector').val()+this.$('#meridian').val();
			var onceOnly = 			this.$('input[name="onceOnly"]').val();
			var duration = 			this.$('input[name="duration"]').val();
			var style = 			this.$('#styleSelector').val();
			var suggestedDonation = this.$('input[name="donation"]').val();
			this.model.save({
				name: className,
				location: location,
				instructor: instructor,
				day: day,
				onceOnly: onceOnly,
				duration: duration,
				style: style
			}, {
				success: function(){
					alert("Class saved successfully!");
				}
			});
		}
	});
 
	return YogaClassFormView;
});