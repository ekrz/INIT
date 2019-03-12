"use strict";

var path = require("../paths.js");
var del = require("del");
var cache = require("gulp-cached");

gulp.task("clean", function() {
	cache.caches = {};
	del.sync(path.to.destination);
});
