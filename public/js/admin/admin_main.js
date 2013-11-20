require.config({
	baseUrl: '/js/vendor',
	paths: {
		    models: '../admin/models',
        collections: '../admin/collections',
        views: '../admin/views',
        controllers: '../admin/controllers',
        routers: '../admin/routers',
        appModels: '../models',
        appViews: '../views',
        appControllers: '../controllers'
	}
});
require([ 
  "jquery", 
  "underscore", 
  "backbone",
  "vent",
  "models/yogaClass",
  "collections/yogaClasses",
  "views/yogaClassFormView",
  "views/yogaClassesView",
  "views/yogaClassView",
  "appModels/currentUser",
  "routers/router"
], function($, _, Backbone, vent, YogaClass, YogaClasses, YogaClassFormView, YogaClassesView, YogaClassView, CurrentUser, Router) {
$(document).ready(function(){
//Router.start();



 $('.Classes').on('click', function(e){
    $('.container').html($('#classesTemplate').html());
    var yogaClasses = new YogaClasses();
    var yogaClassesView = new YogaClassesView({collection: yogaClasses});
    yogaClasses.fetch({reset: true});

 });

 $('.container')

 .delegate('#createClass','click', function(e){
    e.preventDefault();
    var yogaClass = new YogaClass();
    var yogaClassFormView = new YogaClassFormView({model: yogaClass});    
 })
 .delegate('#showClasses','click', function(e){
    e.preventDefault();
    

 });


});
});