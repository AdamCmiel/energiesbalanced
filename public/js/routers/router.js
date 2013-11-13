define([
	'backbone',
	'controllers/sessionsController'
	], function (Backbone, SessionsController) {

	var router = new (Backbone.Router.extend({
            start: function(){
                Backbone.history.start({pushState: true})
            },
            routes:{
                        "/": "checkUser",
                        "sign_in": "loadSignIn",
                        "nav": "loadNav",
                        "logout": "logout"
            },
            checkUser: SessionsController.checkUser(),
            loadSignIn: function(){
            	SessionsController.loggedIn();
                $('body *').remove();
                $('body').html($('#splashPage').html());
            },
            loadNav: function(){
            		//SessionsController.navLoggedIn();
                    $('.conatiner *').remove();
                    $('.container').html($('#navTemplate').html());
            },
            logout: function(){
                    SessionsController.logout();
                    this.navigate('/api/logout');
            }
    }));
	return router;
});