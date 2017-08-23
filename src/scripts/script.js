console.log('Built by Granite Digital. 👉 http://granite.ie 👀');

$( document ).ready(function() {
	// -------------------------------------------------
	// HACK: search simulation for demo
	// -------------------------------------------------
	$('.search-form input').on('change', function(e){
		e.preventDefault();
		$(this).toggleClass('js-active');
		$(this).siblings().hide();
		$('.search-suggestions').hide();
		$('.search-results').show();
		// $('.search-results').toggle();
	});
	// don't send form on ENTER
	$('.search-form input').on('keyup keypress', function(e) {
	  var keyCode = e.keyCode || e.which;
	  if (keyCode === 13) {
			$('.search-results').show();
			$(this).siblings().hide();
			$('.search-suggestions').hide();
	    e.preventDefault();
	  }
	});

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


	// -----------------------------------------------------
	// SLIDER TO GRID 0.0.3
	// Slider init on small screens to a grid on big screens
	// -----------------------------------------------------

	// initialize the slider with the settings
	function slickGrid($slick_slider) {
		var screenWidth = window.innerWidth;
		settings = {
			dots: false,
			arrows:false,
			centerMode: true,
			centerPadding: '0',
			slidesToShow: 1
		}
		if (screenWidth <= 768) {
			$slick_slider.slick(settings);
		}
	}

	// check on resize if slider needs to be init or terminated
	function slickGridResize($slick_slider) {
		var screenWidth = window.innerWidth;
		if (screenWidth > 768) {
			if ($slick_slider.hasClass('slick-initialized')) {
				$slick_slider.slick('unslick');
			}
			return false;
		}
		if (!$slick_slider.hasClass('slick-initialized') && screenWidth <= 768) {
			console.log("crash");
			return $slick_slider.slick(settings);
		}
	}

	// any slider that needs Slider-to-Grid functionality is given this class (markup)
	var slider = $('.js-slickGrid');

	// init all the Slider-to-Grid
	slider.each(function() {
		slickGrid($(this));
	});

	// check Slider-to-Grid init or terminate
	$(window).on('resize', function() {
		slider.each(function(){
			slickGridResize($(this));
		});
	});

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
	// open dropdown (main-nav + search + cart)
	// -------------------------------------------------
	$('.has-children, .search, .show-cart').on('click',function(e){
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

	// -------------------------------------------------
	// global changes on resize
	// -------------------------------------------------
	function resize_Global(){
		equalizeHeight($('.mosaic-tile:not(.mosaic--big) h2'));
	}
	// we use throttle not to spawn resize every time
	$(window).resize( $.throttle( 250, resize_Global ) );

	equalizeHeight($('.mosaic-tile:not(.mosaic--big) h2'));

});

// -------------------------------------------------
// equalizeHeight() : levels selected elements to the same height
// -------------------------------------------------

function equalizeHeight(element) {
	var maxHeight = 0;
	element.css("height", "");
	element.each(function() {
		if ($(this).outerHeight() > maxHeight) {
			maxHeight = $(this).outerHeight();
		}
	});
	if (maxHeight > 0){
		element.css("height", maxHeight);
	}
}



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
