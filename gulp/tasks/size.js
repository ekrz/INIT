"use strict";

var path = require("../paths.js");

// Display a report of the size and Gzipped size of the project
gulp.task("size", function() {
	return gulp.src(path.to.dist).pipe($.sizereport({ gzip: true }));
});
