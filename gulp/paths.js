'use strict';



var path = require('path');
var pathToThisFile = __dirname;
var root = path.dirname(pathToThisFile);
var _root = root + '/src/';
var relativeRoot = 'src/';
var destination = root + '/dist/';


module.exports = {
	to: {
		root : root,
		destination: destination,
		dist : destination + '**/*.*',
		assets: {
			source: _root + 'assets/**/*.*',
			watch: relativeRoot + 'assets/**/*.*',
			folder: _root + 'assets/',
			destination: destination + 'assets'
		},
		favicon: {
			source: _root + 'favicon.png',
			watch: relativeRoot + 'favicon.png',
			destination: destination
		},
		fonts: {
			source: _root + 'fonts/**/*.*',
			watch: relativeRoot + 'fonts/**/*.*',
			folder : _root + 'fonts/',
			destination: destination + 'fonts'
		},
		images: {
			source: _root + 'images/**/*.*',
			watch: relativeRoot + 'images/**/*.*',
			destination: destination + 'images'
		},
		nunjucks: {
			source: [_root + '*.+(html|njk)', _root + 'pages/*.+(html|njk)'],
			watch: relativeRoot + '**/*.+(html|njk)',
			templates: _root + 'templates/',
			destination: destination
		},
		sass: {
			source: _root + 'scss/**/*.scss',
			watch: relativeRoot + 'scss/**/*.scss',
			main: _root + 'scss/main.scss',
			destination: destination + 'styles'
		},
		scripts: {
			source: _root + 'scripts/**/*.js',
			watch: relativeRoot + 'scripts/**/*.js',
			main: _root + 'scripts/main.js',
			destination: destination + 'scripts'
		}
	}
};
