// Default gulp init-ekrz 0.1.5
/*

Activity log :
0.1.5 : Add critical, fontello, size report, better image compression, ...
0.1.4 : Add gulp-load-plugins and refactor gulpfile.js

NOTE: see more history on github (https://github.com/ekrz/init-ekrz).

*/

"use strict";

// Plugins
var gulp = require("gulp"),

  $ = require("gulp-load-plugins")(),

  autoprefixer = require("autoprefixer"),
  browserSync = require("browser-sync"),
  critical = require('critical').stream,

  csso = require("postcss-csso"),

  imageminPngquant = require('imagemin-pngquant'),
  imageminZopfli = require('imagemin-zopfli'),
  imageminMozjpeg = require('imagemin-mozjpeg'), //need to run 'brew install libpng'
  imageminGiflossy = require('imagemin-giflossy'),

  rimraf = require("rimraf"),
  reload = browserSync.reload;

// Variables
var path = {
  build: {
    root: "dist/",
    all: "dist/**/*.*",
    scripts: "dist/js/",
    sass: "dist/styles/",
    images: "dist/images/",
    assets: "dist/assets/",
    fonts: "dist/fonts/"
  },
  src: {
    root: "src/",
    fontelloConfig: "src/assets/fontello-config.json",
    nunjucks: ["src/pages/*.+(html|njk)", "src/*.+(html|njk)"],
    scripts: "src/js/**/*.js",
    sass: "src/scss/**/*.scss",
    images: "src/images/**/*.+(png|jpg|gif|svg|ico)",
    assets: "src/assets/**/*.*",
    fonts: "src/fonts/**/*.+(eot|svg|ttf|woff|woff2)"
  },
  watch: {
    nunjucks: "src/**/*.+(html|njk)",
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

// Render Nunjucks + HTML
gulp.task('nunjucks', function() {
  return gulp.src(path.src.nunjucks)
  .pipe($.nunjucksRender({
    path: ['src/templates']
  }))
  .pipe($.jsbeautifier())
  .pipe(gulp.dest(path.build.root))
  .pipe(
    reload({
      stream: true
    })
  );
});
// JavaScript
gulp.task("scripts", function() {
  return gulp
    .src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      path.src.scripts
    ])
    .pipe($.sourcemaps.init())
    .pipe($.changed(path.build.scripts))
    .on(
      "error",
      $.notify.onError(function(error) {
        return error.message;
      })
    )
    .pipe($.concat('app.min.js'))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('.'))
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

// Fontello Options
var fontelloOptions = {
  css : 'scss/theme/vendors/fontello/',
  font : 'fonts/fontello/'
}

// Styles (Sass)
gulp.task("sass", function() {
  return gulp
    .src(path.src.sass)
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .on(
      "error",
      $.notify.onError(function(error) {
        return error.message;
      })
    )
    .pipe($.postcss(plugins))
    .pipe($.rename('main.min.css'))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(path.build.sass))
    .pipe(
      reload({
        stream: true
      })
    );
});

// Images (/images/) as webp
gulp.task("images", function() {
  var cloneSink = $.clone.sink();
  return gulp
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
    .pipe(cloneSink)
    .pipe($.webp())
    .pipe(cloneSink.tap())
    .pipe(gulp.dest(path.build.images))
    .pipe(
      reload({
        stream: true
      })
    );
});

// Fonts
gulp.task("fonts", function() {
  return gulp
    .src(path.src.fonts)
    .pipe($.changed(path.build.fonts))
    .pipe(gulp.dest(path.build.fonts))
    .pipe(
      reload({
        stream: true
      })
    );
});

// Any other assets from /assets/
gulp.task("assets", function() {
  return gulp
    .src(path.src.assets)
    .pipe($.changed(path.build.assets))
    .pipe(gulp.dest(path.build.assets));
});

// Build queue
gulp.task("build", [
  "sass",
  "scripts",
  "nunjucks",
  "fonts",
  "assets",
  "images"
]);

// Watch
gulp.task("watch", function() {
  $.watch([path.watch.nunjucks], function(event, cb) {
    gulp.start("nunjucks");
  });
  $.watch([path.watch.sass], function(event, cb) {
    gulp.start("sass");
  });
  $.watch([path.watch.scripts], function(event, cb) {
    gulp.start("scripts");
  });
  $.watch([path.watch.images], function(event, cb) {
    gulp.start("images");
  });
  $.watch([path.watch.fonts], function(event, cb) {
    gulp.start("fonts");
  });
  $.watch([path.watch.assets], function(event, cb) {
    gulp.start("assets");
  });
});

// Run the default task
gulp.task("default", ["build", "webserver", "watch"]);

// Generate & Inline Critical-path CSS
gulp.task('critical', function () {
    return gulp.src('dist/*.html')
        .pipe(critical({
          base: 'dist/',
          inline: false,
          css: ['dist/styles/main.min.css']
        }))
        .on(
          "error",
          $.notify.onError(function(error) {
            return error.message;
          })
        )
        .pipe(gulp.dest('dist'));
});

// Import Fontello font (glyph)
gulp.task('fontello', function () {
  return gulp
    .src(path.src.fontelloConfig)
    .pipe($.fontello(fontelloOptions))
    .pipe(gulp.dest(path.src.root))
});

// Display a report of the size and Gzipped size of the project
gulp.task('size', function () {
  return gulp
    .src(path.build.all)
    .pipe($.sizereport({
        gzip: true
    }));
});

// Remove the dist folder
gulp.task("clean", function(cb) {
  rimraf(path.clean, cb);
});
