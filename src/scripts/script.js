console.log('Built by Granite.');

$( document ).ready(function() {


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
	$('.navbar-toggle').on('click', function(e){
		e.preventDefault();
		$('body').toggleClass('js-menu-open');
	});


});


function getCurrentScroll() {
	return window.pageYOffset;
}
