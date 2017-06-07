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
	// $('.navbar-toggle').on('click', function(e){
	// 	e.preventDefault();
	// 	$('body').toggleClass('js-menu-open');
	// });

	// if ( $('body').hasClass('.js-menu-open') )
	// {
	// 	$('.navbar-toggle').on('click', function(e){
	// 		$('.navbar-nav').css({"transform": "translate3d(-100%, 0px, 0px)"})
	// 	});
	// }


});


function getCurrentScroll() {
	return window.pageYOffset;
}
