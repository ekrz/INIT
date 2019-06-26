"use strict";

var path = require("../../paths.js");
const autoprefixer = require("autoprefixer");

// Post-css plugins
var plugins = [
	autoprefixer({
		overrideBrowserslist: ["last 2 versions"]
	})
];

gulp.task("sass-lint", function() {
	return gulp
		.src(path.to.sass.source)
		.pipe($.sassLint())
		.pipe($.sassLint.format());
	// .pipe($.sassLint.failOnError());
});

// Styles (Sass)
gulp.task("sass", ["sass-lint"], function() {
	return gulp
		.src(path.to.sass.main)
		.pipe($.sourcemaps.init())
		.pipe($.sass({outputStyle: 'compressed'}))
		.on(
			"error",
			$.notify.onError(function(error) {
				return error.message;
			})
		)
		.pipe($.rename("main.min.css"))
        .pipe($.postcss(plugins))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest(path.to.sass.destination))
		.pipe(reload({ stream: true }));
});
