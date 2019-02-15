"use strict";

// !: Detects IE
var isIE = /Trident|MSIE/.test(navigator.userAgent);

$(function() {
    HamburgerToggler();
	renderInlineSVG();
});

// !: Hamburger Toggler
function HamburgerToggler() {
	$('[data-toggle="menu-offcanvas"]').on("click", function() {
		$(this).toggleClass("is-active");
		$(this)
			.next("#offcanvas-navbar")
			.toggleClass("open");
	});
}
// !: GD - Equalize Height
function equalizeHeight(element) {
	var maxHeight = 0;
	element.css("height", "");
	element.each(function() {
		if ($(this).outerHeight() > maxHeight) {
			maxHeight = $(this).outerHeight();
		}
	});
	if (maxHeight > 0) {
		element.css("height", maxHeight);
	}
}

// !: GD - Close Cookie Policy
function closeCookiePolicy() {
	jQuery.ajax({
		type: "GET",
		url: "index.cfm?action=ajax_removeCookiePolicy",
		success: function(response) {
			$("#stickycookiePolicy").fadeOut();
		},
		error: function(xhr, ajaxOptions, thrownError) {
			console.log(thrownError);
			console.log(xhr.responseText);
		}
	});
}

// !: Replace all SVG images with inline SVG
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
					try {
						var $svg = jQuery(data).find("svg");
						if (typeof imgID !== "undefined") {
							$svg = $svg.attr("id", imgID);
						}
						if (typeof imgClass !== "undefined") {
							$svg = $svg.attr("class", imgClass + " replaced-svg");
						}
						$svg = $svg.removeAttr("xmlns:a");
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
						$img.replaceWith($svg);
					} catch (ex) {}
				},
				"xml"
			);
		});
}
