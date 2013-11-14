require.config({
	baseUrl: '/js/vendor',
	paths: {
		models: '../admin/models',
        views: '../admin/views',
        controllers: '../admin/controllers',
        routers: '../admin/routers'
	}
});
require([ 
  "jquery", 
  "underscore", 
  "backbone",
  "models/yogaClass",
  "views/yogaClassFormView"
], function($, _, Backbone, YogaClass, YogaClassFormView) {

 $('.Classes').on('click', function(e){
    $('.container').html($('#classesTemplate').html());
 });

 $('.container').delegate('#createClass','click', function(e){
    var yogaClass = new YogaClass();
    var yogaClassFormView = new YogaClassFormView({model: yogaClass});
    alert('clicked');
 });

});