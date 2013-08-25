function getDimensions() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	return {
		"width":width,
		"height":height
	};
};

$(window).on('resize',function(){
	var dimensions = getDimensions;
	$('body').css({
		'height':dimensions.height,
		'width':dimensions.width
	});
};
