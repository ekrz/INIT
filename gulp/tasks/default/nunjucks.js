"use strict";

var path = require("../../paths.js");
var fs = require("fs");

// Render Nunjucks + HTML
gulp.task("nunjucks", function() {
	return gulp
		.src(path.to.nunjucks.source)
		.pipe(
			$.data(function(file) {
				return JSON.parse(fs.readFileSync("./src/data/config.json"));
			})
		)
		.pipe(
			$.data(function(file) {
				return JSON.parse(fs.readFileSync("./src/data/data.json"));
			})
		)
		.pipe(
			$.nunjucksRender({
				path: [path.to.nunjucks.views]
			})
		)
		.on(
			"error",
			$.notify.onError(function(error) {
				return error.message;
			})
		)
		.pipe(gulp.dest(path.to.nunjucks.destination))
		.pipe(reload({ stream: true }));
});

// Render Nunjucks + HTML
gulp.task("build-nunjucks", function() {
	return gulp
		.src(path.to.nunjucks.source)
		.pipe(
			$.nunjucksRender({
				path: [path.to.nunjucks.views]
			})
		)
		.on(
			"error",
			$.notify.onError(function(error) {
				return error.message;
			})
		)
		.pipe($.jsbeautifier())
		.pipe(gulp.dest(path.to.nunjucks.destination))
		.pipe(reload({ stream: true }));
});
