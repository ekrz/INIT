'use strict';



var path = require('../../paths.js');


// Watch
gulp.task('watch', function () {
    gulp.watch(path.to.nunjucks.watch, ['nunjucks']);
    gulp.watch(path.to.sass.source, ['sass']);
    gulp.watch(path.to.scripts.source, ['scripts']);
    gulp.watch(path.to.images.source, ['images']);
});
