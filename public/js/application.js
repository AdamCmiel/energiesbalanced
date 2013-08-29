//Backbone JS
var Welcome = Backbone.Model.extend({});
var welcome = new Welcome({});

var WelcomeView = Backbone.View.extend({
	render: function(){
		var message= '<section>'+this.model.get('message')+'</section>';
		var picture= this.model.get('image');
		$(this.el)
	}
});

function welcomeLisaPage(event) {
	event.preventDefault();
	$.get('/welcome/lisa/data', function(data){
         $('body').html(data);
         $('#lisa-image').addClass('animateLeft');
         $('button').on('click', welcomeToddPage);
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

function loadNavPage(event) {
	event.preventDefault();
	$.get('/nav/data', function(data){
         $('.launch-background').remove();
         $('body').html(data);
    });
}

var router = new Backbone.Router({
	routes:{
		"/": "index",
		"/welcome/lisa": "welcome_lisa",
		"/welcome/todd": "welcome_todd",
		"/nav(/)": "nav_index"
	},
	index: function(){
	},
	welcome_lisa: function(){
      welcomeLisaPage('refresh');
    },
    welcome_todd: function(){
      welcomeToddPage('refresh');
    },
    nav_index: function(){
      loadNavPage('refresh');
    }
});

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
