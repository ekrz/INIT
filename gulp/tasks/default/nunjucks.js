'use strict';



var path = require('../../paths.js');


// Render Nunjucks + HTML
gulp.task('nunjucks', function () {
	return gulp
	    .src(path.to.nunjucks.source)
		.pipe($.nunjucksRender({
			path: [path.to.nunjucks.templates]
		}))
		.pipe($.jsbeautifier())
		.pipe(gulp.dest(path.to.nunjucks.destination))
		.pipe(reload({stream: true}));
});
