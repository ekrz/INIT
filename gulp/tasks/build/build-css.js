'use strict';



var path = require('../../paths.js');
const critical = require('critical').stream;
const csso = require('postcss-csso');
const autoprefixer = require('autoprefixer');


// Post-css plugins
var plugins = [
	autoprefixer({
		browsers: ['last 2 versions']
	}),
	csso({
		restructure: false,
		debug: true
	})
];

// Styles (Sass)
gulp.task('build-css', function () {
	return gulp
		.src(path.to.sass.main)
		.pipe($.sass())
		.on(
			'error',
			$.notify.onError(function (error) {
				return error.message;
			})
		)
		.pipe($.postcss(plugins))
		.pipe($.rename('main.min.css'))
		.pipe(gulp.dest(path.to.sass.destination))
		.pipe(reload({stream: true}));
});


// Generate & Inline Critical-path CSS
gulp.task('build-css-critical', function () {
	return gulp.src('dist/*.html')
		.pipe(critical({
			base: 'dist/',
			inline: false,
			css: ['dist/styles/main.min.css']
		}))
		.on(
			"error",
			$.notify.onError(function (error) {
				return error.message;
			})
		)
		.pipe(gulp.dest('dist'));
});

// PurgeCSS
gulp.task('build-css-purge', function () {
	return gulp
		.src(config.path.build.cssMain)
		.pipe($.purgecss({
			content: [config.path.build.htmlOutput]
		}))
		.pipe(gulp.dest(config.path.build.sass))
});
