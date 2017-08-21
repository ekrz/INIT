console.log('Built by Granite.');

$( document ).ready(function() {

	// adapt full height on mobile (vh css take toolbar)
  var el = $(".banner--fullscreen");

  function resize_Background() {
    el.height($(window).innerHeight());
  }

  $(window).resize( $.throttle( 250, resize_Background ) );

  resize_Background();

	// adapt the coloration of the navbar while scroll
	$( window ).scroll(function() {
		var scroll = getCurrentScroll();
		if ( scroll > 0 ) {
			$('.navbar--custom').addClass('js-scroll');
		}
		else {
			$('.navbar--custom').removeClass('js-scroll');
		}
	});

	// open dropdown
	$('.has-children').on('click',function(e){
		e.preventDefault();
		if($(this).hasClass('js-active')){
				$(this).removeClass('js-active')
		} else {
			$(this).addClass('js-active')
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

/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);
