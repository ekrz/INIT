"use strict";

var path = require("../paths.js");
const csso = require("postcss-csso");
const autoprefixer = require("autoprefixer");

// Post-css plugins
var plugins = {
	"dev": [
		autoprefixer({
			overrideBrowserslist: ["last 2 versions"]
		}),
	],
	"prod": [
		autoprefixer({
			overrideBrowserslist: ["last 2 versions"]
		}),
		csso({
			restructure: false,
			debug: true
		})
	]
}

gulp.task("sass-lint", function() {
	return gulp
		.src(path.to.sass.source)
		.pipe($.if(config.env === 'development', $.sassLint()))
		.pipe($.if(config.env === 'development', $.sassLint.format()));
	    // .pipe($.sassLint.failOnError());
});

gulp.task("sass", ["sass-lint"], function() {
	return gulp
		.src(path.to.sass.main)
		.pipe($.if(config.env === 'development', $.sourcemaps.init()))
		.pipe($.sass({outputStyle: 'compressed'}))
		.on(
			"error",
			$.notify.onError(function(error) {
				return error.message;
			})
        )
		.pipe($.rename({suffix:'.min'}) )
		.pipe($.if(config.env === 'production', $.postcss(plugins.prod)))
		.pipe($.if(config.env === 'development', $.postcss(plugins.dev)))
        .pipe($.if(config.env === 'production', $.purgecss({
            content: [
                path.to.nunjucks.destination + '/*.html'
            ],
            whitelist: ['dot', 'tbody', 'is-active', 'open'],
            whitelistPatterns: [/carousel\-/, /selectric\-/, /flickity\-/, /slider\-/]
        })))
        .pipe($.if(config.env === 'production', $.cssPurge()))
		.pipe($.if(config.env === 'development', $.sourcemaps.write('.')))
		.pipe(gulp.dest(path.to.sass.destination))
		.pipe(reload({ stream: true }));
});
