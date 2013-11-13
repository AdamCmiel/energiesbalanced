define([
	'backbone',
	'models/currentUser'
], function(Backbone, CurrentUser){

	var currentUser = new CurrentUser();
	currentUser.fetch();

	var SessionsController = {
		checkUser: function(){
    	        if(currentUser&& currentUser.facebook_id){
    	            Backbone.history.navigate('nav', {trigger: true});
    	        } else{
    	            currentUser.fetch({
    	                success: function(user){
    	                    if(user && user.facebook_id){
    	                        Backbone.history.navigate('nav', {trigger:true});
    	                    } else Backbone.history.navigate('sign_in', {trigger: true});
    	                },
    	                error: function(error){
    	                    alert(error);
    	                }
    	            });
    	        }
    	},
    	loggedIn: function(){
			if (!currentUser){
				Backbone.history.navigate('/');
			};
		},
		navLoggedIn: function(){
   	    	if(currentUser){
   	    		Backbone.history.navigate('/');
   	    	};
   	    },
   	    logout: function(){
   	    	currentUser = null;
   	    }
    };
    return SessionsController;
});