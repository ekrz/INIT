'use strict';



var path = require('../paths.js');


// Fontello Options
var options = {
	css: 'scss/theme/vendors/fontello/',
	font: path.to.fonts.source + '/fontello/'
}

// Import Fontello font (glyph)
gulp.task('fontello', function () {
	return gulp
		.src(path.to.assets.source + 'fontello-config.json')
		.pipe($.fontello(options))
		.pipe(gulp.dest(path.to.root))
});
