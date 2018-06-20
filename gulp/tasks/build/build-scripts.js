'use strict';



var path = require('../../paths.js');


// JavaScript
gulp.task('build-scripts', function () {
	return gulp
		.src([
			'node_modules/jquery/dist/jquery.js',
			'node_modules/bootstrap/dist/js/bootstrap.js',
			path.to.scripts.source
		])
		.on(
			'error',
			$.notify.onError(function (error) {
				return error.message;
			})
		)
		.pipe($.concat('app.min.js'))
		.pipe($.uglify())
		.pipe(gulp.dest(path.to.scripts.destination))
});
