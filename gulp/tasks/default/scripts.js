"use strict";

var path = require("../../paths.js");

gulp.task("scripts-import", function() {
	return gulp
		.src([
			"node_modules/jquery/dist/jquery.js",
			"node_modules/bootstrap/dist/js/bootstrap.js",
			"node_modules/flickity/dist/flickity.pkgd.js"
		])
		.pipe(gulp.dest(path.to.scripts.destination));
});

gulp.task("eslint", function() {
	return gulp
		.src(path.to.scripts.source)
		.pipe($.eslint())
		.pipe($.eslint.format());
});

// JavaScript
gulp.task("scripts", function() {
	return gulp
		.src(path.to.scripts.source)
		.on(
			"error",
			$.notify.onError(function(error) {
				return error.message;
			})
		)
		.pipe($.concat("app.min.js"))
		.pipe(gulp.dest(path.to.scripts.destination))
		.pipe(reload({ stream: true }));
});
