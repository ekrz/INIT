"use strict";

$(function() {
    // ::: Hamburger Toggle
    $('[data-toggle="menu-offcanvas"]').on("click", function() {
        $(this).toggleClass("is-active");
        $(this)
            .next("#offcanvas-navbar")
            .toggleClass("open");
    });


    
	renderInlineSVG();
});

// ::: Replace all SVG images with inline SVG
function renderInlineSVG() {
	jQuery("img")
		.filter(function() {
			return this.src.match(/.*\.svg$/);
		})
		.each(function() {
			var $img = $(this);
			var imgID = $img.attr("id");
			var imgClass = $img.attr("class");
			var imgURL = $img.attr("src");

			$.get(
				imgURL,
				function(data) {
					// Get the SVG tag, ignore the rest
					try {
						var $svg = jQuery(data).find("svg");

						// Add replaced image's ID to the new SVG
						if (typeof imgID !== "undefined") {
							$svg = $svg.attr("id", imgID);
						}
						// Add replaced image's classes to the new SVG
						if (typeof imgClass !== "undefined") {
							$svg = $svg.attr("class", imgClass + " replaced-svg");
						}

						// Remove any invalid XML tags as per http://validator.w3.org
						$svg = $svg.removeAttr("xmlns:a");

						// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
						if (
							!$svg.attr("viewBox") &&
							$svg.attr("height") &&
							$svg.attr("width")
						) {
							$svg.attr(
								"viewBox",
								"0 0 " + $svg.attr("height") + " " + $svg.attr("width")
							);
						}

						// Replace image with new SVG
						$img.replaceWith($svg);
					} catch (ex) {
						/* Ignore any errors and leave the img as is */
					}
				},
				"xml"
			);
		});
}

// ::: GD - Close Cookie Policy
function closeCookiePolicy(){
	jQuery.ajax({
		type: "GET",
		url: "index.cfm?action=ajax_removeCookiePolicy",
		success: function (response) {
			$("#stickycookiePolicy").fadeOut();
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(thrownError);
			console.log(xhr.responseText);
		}
	});
}

// ::: GD - Equalize Height 
function equalizeHeight(element) {
    var maxHeight = 0;
    element.css("height", "");
    element.each(function () {
        if ($(this).outerHeight() > maxHeight) {
            maxHeight = $(this).outerHeight();
        }
    });
    if (maxHeight > 0) {
        element.css("height", maxHeight);
    }
}