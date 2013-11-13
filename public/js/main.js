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
  "jade",
  "models/currentUser",
  "views/currentUserView",
  "controllers/sessionsController",
  "routers/router"
], function($, _, Backbone, jade,
/*models*/  CurrentUser, 
/*views*/   CurrentUserView, 
/*ctrls*/   SessionsController, 
/*routers*/ Router) {

//application code
    Router.start();

});