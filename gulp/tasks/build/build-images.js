'use strict';



var path = require('../../paths.js');
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGiflossy = require('imagemin-giflossy');


// Images (/images/) as webp
gulp.task("build-images", function () {
	var cloneSink = $.clone.sink();
	return gulp
		.src(path.to.images.source)
		.pipe($.imagemin([
			//png
			imageminPngquant({
				speed: 1,
				quality: 95 //lossy settings
			}),
			imageminZopfli({
				more: true
			}),
			//gif
			// imagemin.gifsicle({
			//     interlaced: true,
			//     optimizationLevel: 3
			// }),
			//gif very light lossy, use only one of gifsicle or Giflossy
			imageminGiflossy({
				optimizationLevel: 3,
				optimize: 3, //keep-empty: Preserve empty transparent frames
				lossy: 2
			}),
			//svg
			$.imagemin.svgo({
				plugins: [{
					removeViewBox: false
				}]
			}),
			//jpg lossless
			$.imagemin.jpegtran({
				progressive: true
			}),
			//jpg very light lossy, use vs jpegtran
			imageminMozjpeg({
				quality: 85
			})
		]))
		.pipe(cloneSink)
		.pipe($.webp())
		.pipe(cloneSink.tap())
		.pipe(gulp.dest(path.to.images.destination))
});
