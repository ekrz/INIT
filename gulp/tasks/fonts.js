"use strict";

var path = require("../paths.js");


gulp.task("fonts", function() {
	return gulp
        .src(path.to.fonts.source)
        .pipe($.if(config.env === 'development', $.fontmin()))
		.pipe(gulp.dest(path.to.fonts.destination))
		.pipe(reload({ stream: true }));
});
