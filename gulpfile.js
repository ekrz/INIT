//default gulp init-ekrz 0.0.12

/*

Activity log :
0.0.12 : added Webp conversion
0.0.11 : redirecting scripts to /js/
0.0.10 : deletion of useless parts of the workflow
0.0.9 : removed regular css support, project is Sass only
0.0.8 : added sass support (build only)
0.0.7 : added gulp-sourcemaps to maps correctly the CSS after autoprefixing
0.0.6 : added cssComb and Prettify to clean HTML, CSS and JS
0.0.5 : splited production and dev mode (more comfortable)
0.0.4 : added gulp-useref + removed image-pngquant
0.0.3 : added gulpif and compression of assets

  .-"""-.
 /      o\
|    o   0).-.
|       .-;(_/     .-.
 \     /  /)).---._|  `\   ,
  '.  '  /((       `'-./ _/|
    \  .'  )        .-.;`  /
     '.             |  `\-'
       '._        -'    /
          ``""--`------`
*/

// tl;dr => 'gulp' to launch dev mode (browser-sync, compress images but do not strike .CSS and .JS rendering)


'use strict';

var gulp = require('gulp'),

    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require("browser-sync"),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    cleanCSS = require('gulp-clean-css'),
    clone = require('gulp-clone'),
    csscomb = require('gulp-csscomb'),
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    notify= require("gulp-notify"),
    prettify = require('gulp-jsbeautifier'),
    rename = require('gulp-rename'),
    rigger = require('gulp-rigger'),
    rimraf = require('rimraf'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    useref = require('gulp-useref'),
    watch = require('gulp-watch'),
    webp = require('gulp-webp'),

    reload = browserSync.reload;

//definition of our paths, we store them in a var.
// => Reusable and editable in only one place

var path = {
    build: {
        html: 'build/',
        scripts: 'build/js/',
        // styles: 'build/styles/',
        images: 'build/images/',
        assets: 'build/assets/',
        contentFiles: 'build/contentFiles/',
        fonts: 'build/fonts/',
        sass: 'build/styles/'
        // sounds: 'build/sounds/'
    },
    src: {
        html: 'src/**/*.html',
        scripts: 'src/js/**/*.js',
        styles: 'src/styles/**/*.css',
        images: 'src/images/**/*.+(png|jpg|gif|svg|ico)',
        assets: 'src/assets/**/*.*',
        contentFiles: 'src/contentFiles/**/*.+(png|jpg|gif|svg|ico)',
        fonts: 'src/fonts/**/*.*',
        sass: 'src/scss/**/*.scss'
        // sounds: 'src/sounds/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        scripts: 'src/js/**/*.js',
        styles: 'src/styles/**/*.css',
        sass: 'src/scss/**/*.scss',
        images: 'src/images/**/*.+(png|jpg|gif|svg|ico)',
        assets: 'src/assets/**/*.*',
        contentFiles: 'src/contentFiles/**/*.+(png|jpg|gif|svg|ico)',
        fonts: 'src/fonts/**/*.*'
        // sounds: 'src/sounds/**/*.*'
    },
    clean: './build'
};


// config our localserver
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 3000,
    logPrefix: "server"
};

//task for the localserver
gulp.task('webserver', function () {
    browserSync(config);
});


//-------------------------------------------------------------
//   _build : dev workflow, used while development is active
//-------------------------------------------------------------


gulp.task('html:build', function () {
    gulp.src(path.src.html)
    .pipe(changed(path.build.html))
        .pipe(rigger())
        .pipe(prettify())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});
gulp.task('scripts:build', function () {
    gulp.src(path.src.scripts)
        .pipe(sourcemaps.init())
            .pipe(changed(path.build.scripts))
            .pipe(rigger())
            .pipe(prettify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.scripts))
        .pipe(reload({stream: true}));
});
gulp.task('styles:build', function () {
    gulp.src(path.src.styles)
        .pipe(sourcemaps.init())
            .pipe(changed(path.build.styles))
            .pipe(autoprefixer())
            .pipe(csscomb())
        .pipe(gulp.dest(path.build.styles))
        .pipe(sourcemaps.write())
        .pipe(reload({stream: true}));
});

gulp.task('sass:build', function() {
  return gulp.src(path.src.sass)
  .pipe(sourcemaps.init())
  .pipe(sass())
  .on("error", notify.onError(function (error) {
    return "huge mistake: " + error.message;
  }))
  .pipe(autoprefixer(["Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", "Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]))
  .pipe(cleanCSS())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(path.build.sass))
  .pipe(reload({stream: true}));

});


gulp.task('images:build', function () {
    var cloneSink = clone.sink();
    gulp.src(path.src.images)
      .pipe(changed(path.build.images))

      // NOTE : This now converts to Webp + optimisation
      // Imagemin
      .pipe(cache(imagemin({
          optimizationLevel: 3,
          progressive: true,
          svgoPlugins: [{
          removeViewBox: false
          }]
      })))

      .pipe(cloneSink)        // clone image
      .pipe(webp())           // convert cloned image to WebP
      .pipe(cloneSink.tap())  // restore original image

      .pipe(gulp.dest(path.build.images))

    .pipe(reload({stream: true}));
});

gulp.task('contentFiles:build', function () {
  var cloneSink = clone.sink();
  gulp.src(path.src.contentFiles)
    .pipe(changed(path.build.contentFiles))

    // NOTE : This now converts to Webp + optimisation
    // Imagemin
    .pipe(cache(imagemin({
        optimizationLevel: 3,
        progressive: true,
        svgoPlugins: [{
        removeViewBox: false
        }]
    })))

    .pipe(cloneSink)        // clone image
    .pipe(webp())           // convert cloned image to WebP
    .pipe(cloneSink.tap())  // restore original image

    .pipe(gulp.dest(path.build.contentFiles))

    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(changed(path.build.contentFiles))
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});
gulp.task('assets:build', function() {
    gulp.src(path.src.assets)
        .pipe(changed(path.build.assets))
        // .pipe(gulpif(['*.js'], uglify()))
        // .pipe(gulpif(['*.css'], prefixer(), cleanCSS()))
        .pipe(gulp.dest(path.build.assets))
});

// gulp.task('sounds:build', function() {
//     gulp.src(path.src.sounds)
//         .pipe(gulp.dest(path.build.sounds))
// });

gulp.task('build', [
    'sass:build',
    'scripts:build',
    'html:build',
    'images:build',
    'contentFiles:build',
    'fonts:build',
    'assets:build'
    // 'sounds:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.styles], function(event, cb) {
        gulp.start('styles:build');
    });
    watch([path.watch.sass], function(event, cb) {
        gulp.start('sass:build');
    });
    watch([path.watch.scripts], function(event, cb) {
        gulp.start('scripts:build');
    });
    watch([path.watch.images], function(event, cb) {
        gulp.start('images:build');
    });
    watch([path.watch.contentFiles], function(event, cb) {
        gulp.start('contentFiles:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.assets], function(event, cb) {
        gulp.start('assets:build');
    });
    // watch([path.watch.sounds], function(event, cb) {
    //     gulp.start('sounds:build');
    // });
});

// Clean => 'gulp clean' / delete the build folder but it's cooler.

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

// By default we are in dev => 'gulp' and 'gulp-default'

gulp.task('default', ['build', 'webserver', 'watch']);
