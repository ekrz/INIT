'use strict';



var path = require('../../paths.js');


// Render Nunjucks + HTML
gulp.task('nunjucks', function () {
	return gulp
    .src(path.to.nunjucks.source)
		.pipe($.nunjucksRender({
			path: [path.to.nunjucks.views]
		}))
		.on('error',
			$.notify.onError(function (error) {
				return error.message;
			})
		)
		.pipe(gulp.dest(path.to.nunjucks.destination))
		.pipe(reload({stream: true}));
});

// Render Nunjucks + HTML
gulp.task('build-nunjucks', function () {
	return gulp
    .src(path.to.nunjucks.source)
		.pipe($.nunjucksRender({
			path: [path.to.nunjucks.views]
		}))
		.on('error',
			$.notify.onError(function (error) {
				return error.message;
			})
		)
		.pipe($.jsbeautifier())
		.pipe(gulp.dest(path.to.nunjucks.destination))
		.pipe(reload({stream: true}));
});
