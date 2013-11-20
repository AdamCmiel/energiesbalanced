define([
	'backbone',
    'models/currentUser',
    'views/currentUserView',
	'controllers/sessionsController'
	], function (Backbone, CurrentUser, CurrentUserView, SessionsController) {


	var router = new (Backbone.Router.extend({
            start: function(){
                Backbone.history.start({pushState: true})
            },
            routes:{
                "/": "checkUser",
                "sign_in": "loadSignIn",
                "nav": "loadNav",
                "logout": "logout",
                "nav/schedule": "renderSchedule"
            },
            checkUser: SessionsController.checkUser(),
            loadSignIn: function(){
            	SessionsController.loggedIn();
                $('body').children().remove();
                $('body').html($('#signIn').html());
                Backbone.history.navigate('nav', {trigger:true});
            },
            loadNav: function(){
            	//SessionsController.navLoggedIn();
                //$('.container').children().remove();
                $('header').html($('#signedInHeaderTemplate').html());
                
                //put this back in
                //SessionsController.renderUser();
                $('.container').html($('#navTemplate').html());
                $('li').on('click', 'a', function(e){
                    e.preventDefault();
                    Backbone.history.navigate('nav/'+$(e.target).attr('href'), {trigger:true});
                });
                $('header').on('click', 'a', function(e){
                    e.preventDefault();
                    Backbone.history.navigate('/', {trigger: true});
                });
            },
            logout: function(){
                SessionsController.logout();
                this.navigate('/api/logout');
            },
            renderSchedule: function(){
                $('.container').html($('#scheduleTemplate').html());
            }
    }));
	return router;
});