"use strict";

var path = require("../paths.js");
const critical = require("critical").stream;
const csso = require("postcss-csso");
const autoprefixer = require("autoprefixer");

// Post-css plugins
var plugins = [
	autoprefixer({
		browsers: ["last 2 versions"]
    }),
    csso({
        restructure: false,
        debug: true
    })
];

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
        // TODO: Different settings for config.env === 'production'/config.env === 'development' on post-css
        .pipe($.if(config.env === 'production', $.postcss(plugins)))
        .pipe($.if(config.env === 'development', $.postcss(plugins)))
        .pipe($.if(config.env === 'production', $.purgecss({
            content: [
                path.to.nunjucks.destination + '/*.html'
            ],
            whitelist: ['dot'],
            whitelistPatterns: [/carousel\-/, /flickity\-/, /slider\-/]
        })))
        .pipe($.if(config.env === 'production', $.postcss(plugins)))
        .pipe($.if(config.env === 'production', $.cssPurge()))
		.pipe($.if(config.env === 'development', $.sourcemaps.write('.')))
		.pipe(gulp.dest(path.to.sass.destination))
		.pipe(reload({ stream: true }));
});


// Generate Critical-path CSS
gulp.task("critical", ["nunjucks", "sass"], function() {
	return gulp
		.src(path.to.nunjucks.destination + "/*.html")
		.pipe(
			critical({
				base: path.to.nunjucks.destination,
				inline: false,
				css: path.to.sass.destination + "/main.min.css"
			})
		)
		.pipe(gulp.dest(path.to.destination));
});
