'use strict';



var path = require('../../paths.js');


// Fonts
gulp.task("build-fonts", function () {
	return gulp
		.src(path.to.fonts.source)
    .pipe($.fontmin())
		.pipe(gulp.dest(path.to.fonts.destination))
});
