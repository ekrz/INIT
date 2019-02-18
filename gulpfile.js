"use strict";

// !:Tasks are splitted under ./gulp/tasks/
// ::: Run npm install, sit back and relax.

global.gulp = require("gulp");
var runSequence = require("run-sequence");
var requireDir = require("require-dir");
var path = require("./gulp/paths.js");
global.$ = require("gulp-load-plugins")();

global.browserSync = require("browser-sync");
global.reload = browserSync.reload;

// Require all tasks.
requireDir("./gulp/tasks", { recurse: true });

// Default task.
gulp.task("default", function() {
    runSequence(
        "clean",
        ["nunjucks", "sass", "scripts-import", "scripts", "images", "fonts"],
        "watch",
        "connect"
    );
});

// Build task.
gulp.task("build", function() {
    runSequence(
        "clean",
        [
            "build-images",
            "build-scripts",
            "build-css",
            "build-fonts",
            "build-nunjucks"
        ],
        "size"
    );
});

// Watch task.
gulp.task("watch", function() {
    $.watch([path.to.nunjucks.watch], function(event, cb) {
        gulp.start("nunjucks");
    });
    $.watch([path.to.sass.watch], function(event, cb) {
        gulp.start("sass");
    });
    $.watch([path.to.scripts.watch], function(event, cb) {
        gulp.start("scripts");
    });
    $.watch([path.to.images.watch], function(event, cb) {
        gulp.start("images");
    });
    $.watch([path.to.assets.watch], function(event, cb) {
        gulp.start("assets");
    });
    $.watch([path.to.fonts.watch], function(event, cb) {
        gulp.start("fonts");
    });
});
