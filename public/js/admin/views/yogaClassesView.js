define([
	'jquery',
	'underscore',
	'backbone',
	'models/yogaClass',
	'collections/yogaClasses'
], function ($,_,Backbone,YogaClass,YogaClasses) {

	var YogaClassesView = Backbone.View.extend({
		el: '#yogaClasses'
		collection: YogaClasses,
		render: function(){
			this.collection.forEach(this.addOne, this);
		},
		addOne: function(yogaClass){
			var yogaClassView = new YogaClassView({model: yogaClass});
			this.$el.append(yogaClassView.render().el);
		}
		
	});
 
	return YogaClassesView;
});