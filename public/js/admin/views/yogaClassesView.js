define([
	'jquery',
	'underscore',
	'backbone',
	'models/yogaClass',
	'views/yogaClassView',
	'collections/yogaClasses'
], function ($,_,Backbone,YogaClass,YogaClassView,YogaClasses) {

	var YogaClassesView = Backbone.View.extend({
		el: '#yogaClasses',
		initialize: function(){
			this.collection.on('reset', this.render, this);
		},
		render: function(){
			this.collection.forEach(this.addOne, this);		
		},
		addOne: function(yogaClass){
			var yogaClassView = new YogaClassView({model: yogaClass});
			console.log(this);
			this.$el.append(yogaClassView.render());
		}
	});
 
	return YogaClassesView;
});