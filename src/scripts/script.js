console.log('Built by Granite.');

$( document ).ready(function() {


	$('.landing.slider').slick({
		arrows:false
	});
	
	// adapt the coloration of the navbar while scroll
	$( window ).scroll(function() {
		var scroll = getCurrentScroll();
		if ( scroll > 0 ) {
			$('nav').addClass('colored');
		}
		else {
			$('nav').removeClass('colored');
		}
	});
	
	function getCurrentScroll() {
		return window.pageYOffset;
	}

});