require.config({
	baseUrl: 'js/vendor',
	paths: {
		models: '../models',
        views: '../views',
        controllers: '../controllers',
        routers: '../routers'
	}
});
require([ 
  "jquery", 
  "underscore", 
  "backbone",
  "models/currentUser",
  "controllers/sessionsController",
  "routers/router"
], function($, _, Backbone, CurrentUser, SessionsController, Router) {

        Router.start();
});