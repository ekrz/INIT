"use strict";

/*

!: Basic commands :!
::: `npm install' => install dependencies
::: `gulp`        => starts gulp default tasks for development (compile, hotreload, ...)
::: `gulp prod`   => starts gulp default tasks for production (dev + optimise, compress, ...)

*/

// ::: Variables & Globals :::
global.gulp = require("gulp");
var runSequence = require("run-sequence");
var requireDir = require("require-dir");
var path = require("./gulp/paths.js");
var extend = require('extend');
var parseArgs = require('minimist');

global.$ = require("gulp-load-plugins")();
global.browserSync = require("browser-sync");
global.reload = browserSync.reload;
global.config = extend({
   env: process.env.NODE_ENV
}, parseArgs(process.argv.slice(2)));

// ::: Variables & Globals :::
requireDir("./gulp/tasks", { recurse: true });

// ::: Environments triggers :::
gulp.task('set-dev-node-env', function() {
   return process.env.NODE_ENV = config.env = 'development';
});
gulp.task('set-prod-node-env', function() {
   return process.env.NODE_ENV = config.env = 'production';
});

// ::: Development tasks :::
gulp.task('default', ['set-dev-node-env'], function() {
   runSequence(
       "clean",
       [
           "nunjucks", 
           "sass", 
           "scripts-import", 
           "scripts", 
           "images",
           "fonts"
       ],
       "watch",
       "connect"
   );
});

// ::: Production tasks :::
gulp.task('prod', ['set-prod-node-env'], function() {
   runSequence(
       "clean",
       [
           "images",
           "nunjucks", 
           "sass",
           "scripts-build", 
           "fonts"
       ],
       "watch",
       "connect"
   );
});    

// ::: Netlify tasks :::
gulp.task('netlify', ['set-prod-node-env'], function() {
   runSequence(
       "clean",
       [
           "images",
           "nunjucks", 
           "sass",
           "scripts-build", 
           "fonts"
       ]
   );
});    

// ::: Tasks watcher :::
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