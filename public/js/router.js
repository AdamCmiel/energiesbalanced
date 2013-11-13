define([
	'backbone'
	], function (Backbone) {

	var currentUser = null;	
	var Router = Backbone.Router.extend({
		routes:{
			"":  "checkUser"
			"/": "checkUser",
			"sign_in": "loadSignIn",
			"nav": "loadNav",
			"logout": "logout"
		},
		checkUser: function(){
			var that = this;
			$.get('/api/session', function(data){
				currentUser = data.currentUser;
				if (currentUser && currentUser.facebook_id){
					this.navigate('nav', {trigger:true});
				} else this.navigate('sign_in', {trigger: true});
			});
		},
		loadSignIn: function(){
			$('body *').hide();
	    	$('body').append($('#splashPage').html());
		},
	    loadNav: function(){
	    	loggedIn();
	    	navView.render();
	    },
	    logout: function(){
	    	currentUser = null;
	    	this.navigate('/api/logout');
	    }

	});

	

	function loggedIn(){
		if (!currentUser){
			this.navigate('/');
		};
	};

	
	return Router;
});