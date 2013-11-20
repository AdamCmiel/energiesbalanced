define([
	'backbone',
    'appModels/currentUser'
	], function (Backbone, CurrentUser) {

	var router = new (Backbone.Router.extend({
            start: function(){
                this.currentUser = new CurrentUser();
                this.currentUser.fetch();
                Backbone.history.start({pushState: true})
            },
            routes:{
                        "admin": "checkUser",
                        "logout": "logout"
            },
            checkUser: function(){
                alert('call checkUser');
                if(this.currentUser && this.currentUser.get('facebook_id')){
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
            logout: function(){
                    SessionsController.logout();
                    this.navigate('/api/logout');
            }
    }));
	return router;
});