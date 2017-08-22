console.log('Built by Granite Digital. 👉 http://granite.ie 👀');

$( document ).ready(function() {
	// -------------------------------------------------
	// slick sliders : initialisation + config
	// -------------------------------------------------

	slickConfig = {
		autoplay: true,
	  mobileFirst: true,
	  dots: false,
	  arrows: false,
	  infinite: true,
	  slidesToShow: 2,
	  responsive: [{
	      breakpoint: 991,
	      settings: {
	        slidesToShow: 3
	      }
	    },
	    {
	      breakpoint: 1199,
	      settings: {
	        slidesToShow: 4
	      }
	    }
	  ]
	}

	$('.slider').slick(slickConfig);
	// -------------------------------------------------
	// adapt full height on mobile (vh css take toolbar)
	// -------------------------------------------------
  var el = $(".banner--fullscreen");

  function resize_Background() {
    if (window.innerWidth < 991) {
      el.height($(window).innerHeight());
    }
  }

  $(window).resize( $.throttle( 250, resize_Background ) );

  resize_Background();

	// -------------------------------------------------
	// adapt the coloration of the navbar while scroll
	// -------------------------------------------------
	$( window ).scroll(function() {
		var scroll = getCurrentScroll();
		if ( scroll > 0 ) {
			$('.navbar--custom').addClass('js-scroll');
		}
		else {
			$('.navbar--custom').removeClass('js-scroll');
		}
	});

	// -------------------------------------------------
	// open dropdown (main-nav + search)
	// -------------------------------------------------
	$('.has-children, .search').on('click',function(e){
		e.preventDefault();

		$('li').not(this).each(function(){
			$(this).removeClass('js-active').find('.nav_container').slideUp();
		});

		if($(this).hasClass('js-active')){
				$(this).removeClass('js-active').find('.nav_container').slideToggle();
		} else {
			$(this).addClass('js-active').find('.nav_container').slideToggle()
		}
	});

	// -------------------------------------------------
	// do not close menu when clicking the children (HACK: input::focus)
	// -------------------------------------------------
	$('.nav_container').on('click', function(e){
		e.stopPropagation();
	});

	// -------------------------------------------------
	// open filters+category on mobile
	// -------------------------------------------------

	// TODO : need to refire correctly that on resize

	var windowsWidth = window.innerWidth;
	if (windowsWidth < 991) {
	  $('.sidenav-block').on('click', function(e) {

	    e.preventDefault();

	    $('.sidenav-block').not(this).each(function() {
	      $(this).removeClass('js-active').find('.sidenav-block_container').slideUp();
	    });

	    if ($(this).hasClass('js-active')) {
	      $(this).removeClass('js-active').find('.sidenav-block_container').slideUp();
	    } else {
	      $(this).addClass('js-active').find('.sidenav-block_container').slideDown();
	    }

	  });
	}

	// -------------------------------------------------
	// hover effect shop grid : product
	// -------------------------------------------------

	$('.product').hover(function(){
		$('.product').not(this).each(function() {
			$(this).toggleClass('js-not-active');
		});
	})

	// -------------------------------------------------
	// on click effect shop grid : filter
	// -------------------------------------------------
	$('.filter-group a').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('js-ticked');
	})

	// -------------------------------------------------
	// on click effect shop grid : sort by
	// -------------------------------------------------
	$('.sort-by span').on('click', function(e){
		e.preventDefault();
		$(this).siblings('.sort-by-options').slideToggle();

		// hide the products
		$('.product').not(this).each(function() {
			$(this).toggleClass('js-not-active');
		});
	})

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


// set windows width
function resize_WindowsWidth() {
	var windowsWidth =  window.innerWidth;
}

resize_WindowsWidth();

// return current page offset
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
