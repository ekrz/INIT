"use strict";



// Default gulp init-ekrz 0.2.0
// Tasks are splitted under ./gulp/tasks/
// Run npm install, sit back and relax.


global.gulp         = require("gulp");
var runSequence     = require('run-sequence');
var requireDir      = require('require-dir');

global.$            = require("gulp-load-plugins")();

global.browserSync  = require("browser-sync");
global.reload       = browserSync.reload;


// Require all tasks.
requireDir('./gulp/tasks', { recurse: true });

// Default task.
gulp.task('default', function() {
  runSequence(
    'clean',
    [
      'nunjucks',
      'sass',
      'scripts-import',
      'scripts',
      'images',
      'fonts'
    ],
    'watch',
    'connect'
  );
});

// Build task.
gulp.task('build', function() {
	runSequence(
		'clean',
		[
			'build-images',
			'build-scripts',
			'build-css',
			'build-fonts',
			'nunjucks'
		],
		'connect',
        'size'
	);
});
