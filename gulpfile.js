// Default gulp init-ekrz 0.1.4

// INSTALL : npm i
// LAUNCH : gulp

/*

Activity log :
0.1.4 : Add gulp-load-plugins and refactor gulpfile.js
0.1.3 : ITCSS-like integration

NOTE: see more history on github (https://github.com/ekrz/init-ekrz).

*/

"use strict";

// Plugins
var gulp = require("gulp"),
  $ = require("gulp-load-plugins")(),
  autoprefixer = require("autoprefixer"),
  browserSync = require("browser-sync"),
  csso = require("postcss-csso"),
  imageminPngquant = require('imagemin-pngquant'),
  imageminZopfli = require('imagemin-zopfli'),
  imageminMozjpeg = require('imagemin-mozjpeg'), //need to run 'brew install libpng'
  imageminGiflossy = require('imagemin-giflossy'),
  rimraf = require("rimraf"),
  sourcemaps = require("gulp-sourcemaps"),
  reload = browserSync.reload;

// Variables
var path = {
  build: {
    html: "dist/",
    scripts: "dist/js/",
    sass: "dist/styles/",
    images: "dist/images/",
    assets: "dist/assets/",
    fonts: "dist/fonts/"
  },
  src: {
    html: "src/**/*.html",
    scripts: "src/js/**/*.js",
    sass: ["!src/scss/bootstrap/*.scss", "src/scss/**/*.scss"],
    images: "src/images/**/*.+(png|jpg|gif|svg|ico)",
    assets: "src/assets/**/*.*",
    fonts: "src/fonts/**/*.+(eot|svg|ttf|woff|woff2)"
  },
  watch: {
    html: "src/**/*.html",
    scripts: "src/js/**/*.js",
    sass: "src/scss/**/*.scss",
    images: "src/images/**/*.+(png|jpg|gif|svg|ico)",
    assets: "src/assets/**/*.*",
    fonts: "src/fonts/**/*.+(eot|svg|ttf|woff|woff2)"
  },
  clean: "./dist"
};

// local server
var config = {
  server: {
    baseDir: "./dist"
  },
  // proxy: '.dev'
  port: 9000
};
gulp.task("webserver", function() {
  browserSync(config);
});

//-------------------------------------------------------------
//   _build : dev workflow, used while development is active
//-------------------------------------------------------------

// HTML and partials
gulp.task("html:build", function() {
  gulp
    .src(path.src.html)
    .pipe($.injectPartials())
    .pipe($.jsbeautifier())
    .pipe($.size())
    .pipe(gulp.dest(path.build.html))
    .pipe(
      reload({
        stream: true
      })
    );
});

// JavaScript
gulp.task("scripts:build", function() {
  gulp
    .src(path.src.scripts)
    .pipe(sourcemaps.init())
    .pipe($.changed(path.build.scripts))
    .pipe($.uglify())
    .on(
      "error",
      $.notify.onError(function(error) {
        return "oh no! " + error.message;
      })
    )
    .pipe(sourcemaps.write())
    .pipe($.size())
    .pipe(gulp.dest(path.build.scripts))
    .pipe(
      reload({
        stream: true
      })
    );
});

// Post-css plugins
var plugins = [
  autoprefixer({
    browsers: ["last 2 versions"]
  }),
  csso({
    restructure: false,
    debug: true
  })
];

// Styles (Sass)
gulp.task("sass:build", function() {
  return gulp
    .src(path.src.sass)
    .pipe(sourcemaps.init())
    .pipe($.sass())
    .on(
      "error",
      $.notify.onError(function(error) {
        return "oh no! " + error.message;
      })
    )
    .pipe($.postcss(plugins))
    .pipe(sourcemaps.write("."))
    .pipe($.size())
    .pipe(gulp.dest(path.build.sass))
    .pipe(
      reload({
        stream: true
      })
    );
});

// Images (/images/) as webp
gulp.task("images:build", function() {
  var cloneSink = $.clone.sink();
  gulp
    .src(path.src.images)
    .pipe($.changed(path.build.images))
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
    // .pipe(cloneSink)
    // .pipe($.webp())
    // .pipe(cloneSink.tap())
    // .pipe($.size())
    .pipe(gulp.dest(path.build.images))
    // .pipe(
    //   reload({
    //     stream: true
    //   })
    // );
});

// Fonts
gulp.task("fonts:build", function() {
  gulp
    .src(path.src.fonts)
    .pipe($.changed(path.build.fonts))
    .pipe($.size())
    .pipe(gulp.dest(path.build.fonts))
    .pipe(
      reload({
        stream: true
      })
    );
});

// Any other assets from /assets/
gulp.task("assets:build", function() {
  gulp
    .src(path.src.assets)
    .pipe($.changed(path.build.assets))
    .pipe(gulp.dest(path.build.assets));
});

gulp.task("build", [
  "sass:build",
  "scripts:build",
  "html:build",
  "images:build",
  "fonts:build",
  "assets:build"
]);

gulp.task("watch", function() {
  $.watch([path.watch.html], function(event, cb) {
    gulp.start("html:build");
  });
  $.watch([path.watch.sass], function(event, cb) {
    gulp.start("sass:build");
  });
  $.watch([path.watch.scripts], function(event, cb) {
    gulp.start("scripts:build");
  });
  $.watch([path.watch.images], function(event, cb) {
    gulp.start("images:build");
  });
  $.watch([path.watch.fonts], function(event, cb) {
    gulp.start("fonts:build");
  });
  $.watch([path.watch.assets], function(event, cb) {
    gulp.start("assets:build");
  });
});

// TASK : Clean
gulp.task("clean", function(cb) {
  rimraf(path.clean, cb);
});

// TASK : Default (runs build, browserSync)
gulp.task("default", ["build", "webserver", "watch"]);
