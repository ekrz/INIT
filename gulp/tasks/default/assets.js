'use strict';



var path = require('../../paths.js');


// Any other assets from /assets/
gulp.task("assets", function () {
	return gulp
		.src(path.to.assets.source)
		.pipe(gulp.dest(path.to.assets.destination))
    .pipe(reload({stream: true}));
});

gulp.task('images', function() {
	return gulp.src(path.to.images.source)
		.pipe(gulp.dest(path.to.images.destination))
		.pipe(reload({stream: true}));
});

gulp.task('favicon', function() {
	return gulp.src(path.to.favicon.source)
		.pipe(gulp.dest(path.to.favicon.destination))
		.pipe(reload({stream: true}));
});
