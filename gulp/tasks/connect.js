"use strict";

var path = require("../paths.js");

/*

!: Basic switches :!
::: Replace `proxy` with your distant site and comment out `server` to allow live reload on the distant server.

*/

// ::: Server Config
var serverConfig = {
	server: {
		baseDir: path.to.destination
	},
	// proxy: 'http://site.com'
	port: 9000,
	open: false,
	// notify: false
};

gulp.task("connect", function() {
	browserSync(serverConfig);
});
