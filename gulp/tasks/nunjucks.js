"use strict";

var path = require("../paths.js");
var fs = require("fs");

gulp.task("nunjucks", function() {
    return gulp
        .src(path.to.nunjucks.source)
        .pipe(
            $.data(function(file) {
                return JSON.parse(fs.readFileSync("./src/data/config.json"));
            })
        )
        .pipe(
            $.data(function(file) {
                return JSON.parse(fs.readFileSync("./src/data/data.json"));
            })
        )
        .pipe(
            $.nunjucksRender({
                path: [path.to.nunjucks.views]
            })
        )
        .on(
            "error",
            $.notify.onError(function(error) {
                return error.message;
            })
        )
        .pipe($.if(config.env === 'production', $.jsbeautifier()))
        .pipe(gulp.dest(path.to.nunjucks.destination))
        .pipe(reload({ stream: true }));
});
