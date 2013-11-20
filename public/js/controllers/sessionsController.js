define([
	'backbone',
	'models/currentUser',
	'views/currentUserView'
], function(Backbone, CurrentUser, CurrentUserView){

	var currentUser = new CurrentUser();
	currentUser.fetch({success: function(data){
    console.log(data);
  }});
	var currentUserView = new CurrentUserView({model: currentUser});

	var SessionsController = {
		checkUser: function(){
    	        if(currentUser&& currentUser.facebook_id){
    	            Backbone.history.navigate('nav', {trigger: true});
    	        } else{
    	            currentUser.fetch({
    	                success: function(user){
    	                	console.log(user);
    	                    if(user && user.get('facebook_id')){
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
			} else return currentUser;
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