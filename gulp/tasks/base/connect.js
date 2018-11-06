'use strict';



var path = require('../../paths.js');


// local server
var serverConfig = {
    server: {
        baseDir: path.to.destination
    },
    // proxy: 'http://site.com'
    port: 9000,
    open: false
};

gulp.task('connect', function () {
    browserSync(serverConfig);
});
