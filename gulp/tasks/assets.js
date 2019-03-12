"use strict";

var path = require("../paths.js");

// Any other assets from /assets/
gulp.task("assets", function() {
	return gulp
		.src(path.to.assets.source)
		.pipe(gulp.dest(path.to.assets.destination))
		.pipe(reload({ stream: true }));
});

// Fontello Options
var options = {
	css: "./src/scss/theme/vendors/fontello/",
	font: "src/fonts/fontello"
};

// Import Fontello font (glyph)
gulp.task("fontello", function() {
	return gulp
		.src(path.to.data.fontello)
		.pipe($.fontello(options))
		.pipe(gulp.dest(path.to.root));
});

// Transform fontello output to .scss
gulp.task("fontello-sass", ["fontello"], function() {
	return gulp
		.src(options.css + "fontello.css")
		.pipe($.concat("_s.fontello.scss"))
		.pipe(gulp.dest("src/scss/theme/settings/"));
});

gulp.task("favicon", function() {
	return gulp
		.src(path.to.favicon.source)
		.pipe(gulp.dest(path.to.favicon.destination))
		.pipe(reload({ stream: true }));
});
