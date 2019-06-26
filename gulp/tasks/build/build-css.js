"use strict";

var path = require("../../paths.js");
const critical = require("critical").stream;
const csso = require("postcss-csso");
const autoprefixer = require("autoprefixer");

// Post-css plugins
var plugins = [
	autoprefixer({
		overrideBrowserslist: ["last 2 versions"]
	}),
	csso({
		restructure: false,
		debug: true
	})
];

// Styles (Sass)
gulp.task("build-sass", function() {
	return gulp
		.src(path.to.sass.main)
		.pipe($.sass())
		.pipe($.rename("main.min.css"))
		.pipe(gulp.dest(path.to.sass.destination))
		.pipe(reload({ stream: true }));
});

// PurgeCSS (with purgecss and css-purge)
gulp.task("build-css-purge", ["build-sass"], function() {
	return gulp
		.src(path.to.sass.destination + "/main.min.css")
        .pipe($.purgecss({
            content: [
                path.to.nunjucks.destination + '/*.html'
            ],
            whitelist: ['dot'],
            whitelistPatterns: [/carousel\-/, /flickity\-/, /slider\-/]
        }))
		.pipe($.postcss(plugins))
		.pipe($.cssPurge())
		.pipe(gulp.dest(path.to.sass.destination));
});

// Generate & Inline Critical-path CSS
gulp.task("build-css-critical", ["build-css-purge"], function() {
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

gulp.task("build-css", ["build-css-purge"]);
