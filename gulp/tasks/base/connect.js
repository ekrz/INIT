'use strict';



var path = require('../../paths.js');


// local server
var serverConfig = {
    server: {
        baseDir: path.to.destination
    },
    // proxy: 'http://site.com'
    port: 9000,
    tunnel: 'ekrz'
};

gulp.task('connect', function () {
    browserSync(serverConfig);
});
