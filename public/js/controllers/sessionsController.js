define([
	'backbone',
	'models/currentUser',
	'views/currentUserView'
], function(Backbone, CurrentUser, CurrentUserView){

	var currentUser = new CurrentUser();
	currentUser.fetch();
	var currentUserView = new CurrentUserView({model: currentUser});

	var SessionsController = {
		checkUser: function(){
    	        if(currentUser&& currentUser.get('facebook_id')){
    	            Backbone.history.navigate('nav', {trigger: true});
    	        } else{
    	            currentUser.fetch({
    	                success: function(user){
    	                    if(user && user.get('facebook_id')){
    	                        Backbone.history.navigate('nav', {trigger:true});
    	                    } else Backbone.history.navigate('sign_in', {trigger: true});
    	                },
    	                error: function(error){
                          console.log('error');
                          console.log(error);
    	                    alert('error');
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
   	    },
    
    renderUser: function(){
      currentUserView.render();
    },
  }

    return SessionsController;
});