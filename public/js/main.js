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


        /*var currentUser = new CurrentUser();
        currentUser.fetch();        

        var Router = Backbone.Router.extend({
            initialize:{
                Backbone.history.start({pushState: true})
            },
            routes:{
                        "/": "checkUser",
                        "sign_in": "loadSignIn",
                        "nav": "loadNav",
                        "logout": "logout"
            },
            checkUser: SessionsController.checkUser,
            loadSignIn: function(){
                $('body *').hide();
                $('body').append($('#splashPage').html());
            },
            loadNav: function(){
            		navLoggedIn();
                    navView.render();
            },
            logout: function(){
                    currentUser = null;
                    this.navigate('/api/logout');
            }
        });

        var router = new Router();

        function checkUserAndNavigate(){
        	if(currentUser&& currentUser.facebook_id){
        		router.navigate('nav', {trigger: true});
        	} else{
        		currentUser.fetch({
        			success: function(user){
        				if(user && user.facebook_id){
        					router.navigate('nav', {trigger:true});
                        } else router.navigate('sign_in', {trigger: true});
        			},
        			error: function(error){
        				alert(error);
        			}
        		});
        	};

        	/*
                $.get('/api/session', function(data){
                        currentUser = data.currentUser;
                        if (currentUser && currentUser.facebook_id){
                                router.navigate('nav', {trigger:true});
                        } else router.navigate('sign_in', {trigger: true});
                });
            
        };

        function loggedIn(){
                if (!currentUser){
                        router.navigate('/');
                };
        };

        function navLoggedIn(){
        	if(currentUser){
        		router.navigate('/');
        	};
        };

        //Backbone.history.start({pushState: true});
        */
        Router.start();
        Router.log();
});