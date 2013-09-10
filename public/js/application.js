var session;

$(document).ready(function(){
	$('#login').on('click', openNav);


//Welcome Messages Model-View
var Welcome = Backbone.Model.extend({});
var welcome = new Welcome({});

var WelcomeView = Backbone.View.extend({
	template: _.template($('#myTemplate').html()),
	render: function(data){
       $('body').html(this.template(data));
	}
});

var welcomeView = new WelcomeView({model: welcome});

//Nav Model-View
var NavModel = Backbone.Model.extend({});
var navModel = new NavModel({});

var NavView = Backbone.View.extend({
	template: _.template($('#navTemplate').html()),
	preTemplate: _.template('<li class=\"<%= li_class %>\"><p><%=li_text%></p></li>'),
    render: function(data){
    	var markup = this.preRender(data);
    	$('body').html(this.template(markup));
    },
    preRender: function(data){
    	var list = "";
    	console.log(data);
    	console.log(data.listItems);
    	//grabs each list item from JSON object and parses to string of <li> to populate <ul> in #navTemplate
        for(var i=0;i<data.listItems.length;i++){
          var listItem = this.preTemplate(data.listItems[i]);
          list += listItem;
        }
        console.log(list)
        //repopulates listItems in data to the new string of <li>
        data.listItems = list;
        //returns updated data to variable assignment
        return data;
    }
});

var navView = new NavView({model:navModel});


function openNav(event){
	event.preventDefault();
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

var Router = Backbone.Router.extend({
	routes:{
		"/": "index",
		"/welcome/lisa": "welcome_lisa",
		"/welcome/todd": "welcome_todd",
		"markup/nav": "nav_index"
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
      openNav();
    }

});

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

/*
var router = new Router();
$('#login').on('click', function(){
	router.navigate('/markup/nav', { trigger: true });
});

Backbone.history.start({
	pushState: true,
	silent: false
 });

*/

//More jQuery-like



/*function getDimensions() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	return {
		"width":width,
		"height":height
	};
};

$(window).on('resize',function(){
	var dimensions = getDimensions();
	$('body').css({
		'height':dimensions.height,
		'width':dimensions.width
	});
	$('.title').css({

		'margin-top':0.2*dimensions.height+''
		'margin-bottom':0.1*dimensions.height+''
	});

};
*/

//end doc ready
});

