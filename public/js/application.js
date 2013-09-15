var session;

$(document).ready(function(){
		//$('#login').on('click', );
	console.log('console logging');

	function loadSplashPage(){
		$('body *').hide();
	    $('body').append($('#splashPage').html());
	};



	loadSplashPage();

	function listGen(data, that){
		var list = "";
	    	//console.log(data);
	    	//console.log(data.listItems);
	    	//grabs each list item from JSON object and parses to string of <li> to populate <ul> in #navTemplate
	    for(var i=0;i<data.listItems.length;i++){
	      var listItem = that.preTemplate(data.listItems[i]);
	      list += listItem;
	    }
	        //console.log(list)
	        //repopulates listItems in data to the new string of <li>
	    data.listItems = list;
	        //returns updated data to variable assignment
	    return data;
	};

	var PageContent = Backbone.Model.extend({
		urlRoot: '/markup'
	});
	var pageContent = new PageContent({});

	


	/*Welcome Messages Model-View
	var Welcome = Backbone.Model.extend({});
	var welcome = new Welcome({});

	var WelcomeView = Backbone.View.extend({
		template: _.template($('#myTemplate').html()),
		render: function(data){
	       $('body').html(this.template(data, this));
		}
	});

	var welcomeView = new WelcomeView({model: welcome});
	*/

	//Nav Model-View
	var NavContent = PageContent.extend({});
	var navContent = new NavContent({id:'nav'});

	console.log($('#navTemplate').html());

	var NavView = Backbone.View.extend({
		template: _.template($('#navTemplate').html()),
		preTemplate: _.template($('#navLiTemplate').html()),
		//preTemplate: _.template('<li class=\"<%= li_class %>\"><p><%=li_text%></p></li>'),
	    shellTemplate: _.template($('#appShell').html()),
	    render: function(data){
	    	var markup = listGen(data,this);
	    	$('body').html(this.shellTemplate(markup));
	    	$('.container').html(this.template(markup));
	    },
	    openNav: function(){
	    	var that = this;
	    	var data = this.model.fetch({
	    		success: function(model, response){
	    			that.render(response);
	    		},
	    		error: function(model, response){
	    			console.log(":(");
	    		}
	    	});
	    }
    //end NavView
	});
	var navView = new NavView({model:navContent});
    //instanciate, bind to model navContent

    var ScheduleContent = PageContent.extend({});
    var scheduleContent = new ScheduleContent({id:'schedule'});

    var ScheduleView = Backbone.View.extend({
    	template: _.template($('#scheduleTemplate').html()),
    	preTemplate: _.template($('#classLi').html()),
    	render: function(data){
    	    var markup = listGen(data);
    	    $('.container').html(this.template(markup));
    	},
    	openSchedule: function(){
    		var that = this;
    		var data = this.model.fetch({
    			success: function(model, response){
    				that.render(response);
    			},
    			error: function(model, response){
    				console.log(":(");
    			}
    		});
    	}
    //end ScheduleView
    });
    var scheduleView = new ScheduleView({model:scheduleContent});




	/*
	function openNav(){
		//event.preventDefault();
		$.get('/markup/nav', function(data){
			navView.render(data);
		});
	};


	function welcomeLisaPage(event) {
		event.preventDefault();
		$.get('/welcome/lisa?message=Success!', function(data){
		  console.log(data);
		  welcomeView.render(data)
		});
	};

	function welcomeToddPage(event) {
		event.preventDefault();
		$.get('/welcome/todd/data', function(data){
	         $('body').html(data);
	         $('#todd-image').addClass('animateRight');
	         $('button').on('click', loadNavPage);
	    });
	};
	*/

	var Router = Backbone.Router.extend({
		routes:{
			"/": "index",
			"/welcome/lisa": "welcome_lisa",
			"/welcome/todd": "welcome_todd",
			"/nav": "nav_index",
			"nav": "nav_index",
			"schedule": "routeSchedule"

		},
		index: function(){
			$('body').html('');
		},
		welcome_lisa: function(){
	      welcomeLisaPage('refresh');
	    },
	    welcome_todd: function(){
	      welcomeToddPage('refresh');
	    },
	    nav_index: function(){
	    	navView.openNav();
	    },
	    routeSchedule: function(){
	    	scheduleView.openSchedule();
	    }
	});

    window.router = new Router();


	$('a').on('click', '.button', function(event){
		event.preventDefault();
		router.navigate('nav', {trigger: true});
	});

	$('.schedule').on('click', function(event){
		event.preventDefault();
		router.navigate('schedule', {trigger: true});
	});


	//router.on('route:/nav',navView.render);

	window.User = Backbone.Model.extend({
		parse: function(data){
			console.log(data);
			return data.session;
		},
		url: '/session'
	});

	$.get('/session', function(data){
	  session = data.session.passport;
	});

	$('li').on('click', 'a', function(event){
		event.preventDefault();
		alert('Click alert foo');
	});

	/*
	var router = new Router();
	$('#login').on('click', function(){
		router.navigate('/markup/nav', { trigger: true });
	});
	*/
	Backbone.history.start({
		pushState: true,
		silent: false
	 });
	//More jQuery-like



	/*

	
	*/

	//end doc ready
});

