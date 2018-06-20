// File globs.

'use strict';

var path = require('path');

var pathToThisFile = __dirname;
var root = path.dirname(pathToThisFile);
var _root = root + '/src/';

var destination = root + '/dist/';

module.exports = {
	to: {
		root : root,
		destination: destination,
		nunjucks: {
			source: [_root + '/*.+(html|njk)', _root + '/pages/*.+(html|njk)'],
			watch: _root + '/**/*.+(html|njk)',
			templates: _root + '/templates/',
			destination: destination
		},
		sass: {
			source: _root + '/scss/**/*.scss',
			main: _root + '/scss/main.scss',
			destination: destination + 'styles'
		},
		scripts: {
			source: _root + '/scripts/**/*.js',
			main: _root + '/scripts/main.js',
			destination: destination + 'scripts'
		},
		images: {
			source: _root + '/images/**/*.*',
			destination: destination + 'images'
		},
		assets: {
			source: _root + '/assets/',
			destination: destination + 'assets'
		},
		fonts: {
			source: _root + '/fonts/',
			destination: destination + 'fonts'
		},
		favicon: {
			source: _root + '/favicon.png',
			destination: destination
		}
	}
};
