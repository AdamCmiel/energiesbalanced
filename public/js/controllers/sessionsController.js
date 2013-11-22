define([
	'backbone',
	'models/currentUser',
	'views/currentUserView'
], function(Backbone, CurrentUser, CurrentUserView){

	var currentUser = new CurrentUser();
	currentUser.fetch();
	var currentUserView = new CurrentUserView({model: currentUser});
  
  setInterval(function(){currentUser.fetch()}, 10000);

	var SessionsController = {
		checkUser: function(){
        console.log(currentUser.get('facebook_id'));
    	        if(currentUser&& currentUser.get('facebook_id')){
    	            Backbone.history.navigate('nav', {trigger: true});
    	        } else{
    	            currentUser.fetch({
    	                success: function(user){
                        console.log('fetched on check');
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
			if (!currentUser.get('facebook_id')){
        alert('notloggedin');
        Backbone.history.navigate('/', {trigger: true});
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