"use strict";

var path = require("../paths.js");

var scriptsBuild = [
	"node_modules/jquery/dist/jquery.js",
	"node_modules/bootstrap/dist/js/bootstrap.js",
	"node_modules/flickity/dist/flickity.pkgd.js",
	path.to.scripts.source
];
var scriptsImport = [
	"node_modules/jquery/dist/jquery.js",
	"node_modules/bootstrap/dist/js/bootstrap.js",
	"node_modules/flickity/dist/flickity.pkgd.js"
];

gulp.task("scripts-import", function() {
	return gulp
		.src(scriptsImport)
		.pipe(gulp.dest(path.to.scripts.destination));
});

gulp.task("eslint", function() {
	return gulp
		.src(path.to.scripts.source)
		.pipe($.eslint())
		.pipe($.eslint.format());
});

gulp.task("scripts", function() {
	return gulp
		.src(path.to.scripts.source)
		.on(
			"error",
			$.notify.onError(function(error) {
				return error.message;
			})
        )
        .pipe($.babel())
		.pipe($.concat("app.min.js"))
		.pipe(gulp.dest(path.to.scripts.destination))
		.pipe(reload({ stream: true }));
});

gulp.task("scripts-build", function() {
	return gulp
		.src(scriptsBuild)
		.on(
			"error",
			$.notify.onError(function(error) {
				return error.message;
			})
        )
        .pipe($.babel())
		.pipe($.concat("app.min.js"))
		.pipe($.uglify())
		.pipe(gulp.dest(path.to.scripts.destination));
});
