'use strict';



var path = require('../../paths.js');
const csso = require("postcss-csso");
const autoprefixer = require("autoprefixer");


// Post-css plugins
var plugins = [
	autoprefixer({
		browsers: ["last 2 versions"]
	})
];

// Styles (Sass)
gulp.task("sass", function () {
	return gulp
		.src(path.to.sass.source)
		.pipe($.sourcemaps.init())
		.pipe($.sass())
		.on(
			"error",
			$.notify.onError(function (error) {
				return error.message;
			})
		)
		.pipe($.postcss(plugins))
		.pipe($.rename('main.min.css'))
		.pipe($.sourcemaps.write("."))
		.pipe(gulp.dest(path.to.sass.destination))
		.pipe(reload({stream: true}));
});
