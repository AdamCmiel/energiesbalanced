require.config({
	baseUrl: 'js/vendor',
	paths: {
		models: '../models',
    collections: '../collections',
    views: '../views',
    controllers: '../controllers',
    routers: '../routers'
	}
});
require([ 
  "jquery", 
  "underscore", 
  "backbone",
  "jade",
  "vent",
  "models/currentUser",
  "views/currentUserView",
  "controllers/sessionsController",
  "routers/router"
], function($, _, Backbone, jade, vent,
/*models*/  CurrentUser, 
/*views*/   CurrentUserView, 
/*ctrls*/   SessionsController, 
/*routers*/ Router) {

//application code
    Router.start();

});