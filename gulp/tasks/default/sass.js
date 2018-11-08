"use strict";

var path = require("../../paths.js");
const csso = require("postcss-csso");
const autoprefixer = require("autoprefixer");

// Post-css plugins
var plugins = [
  autoprefixer({
    browsers: ["last 2 versions"]
  })
];

gulp.task("sass-lint", function() {
  return gulp
    .src(path.to.sass.source)
    .pipe(
      $.sassLint({
        files: {
          ignore: "src/scss/theme/settings/fontello/fontello.scss"
        }
      })
    )
    .pipe($.sassLint.format())
    // .pipe($.sassLint.failOnError());
});

// Styles (Sass)
gulp.task("sass", ["sass-lint"], function() {
  return gulp
    .src(path.to.sass.main)
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .on(
      "error",
      $.notify.onError(function(error) {
        return error.message;
      })
    )
    .pipe($.postcss(plugins))
    .pipe($.rename("main.min.css"))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(path.to.sass.destination))
    .pipe(reload({ stream: true }));
});
