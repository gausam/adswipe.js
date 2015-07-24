var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

//var gutil = require('gulp-util');
var webpack = require('webpack-stream');
var notify = require("gulp-notify");
var ifElse = require('gulp-if-else');

var webpackError = false;
gulp.task('default', function() {

    return gulp.src('./src/adswipe.js')
        .pipe(webpack(
            require('./webpack.config.js'),
            null,
            function(err, stats) {
                if (err) {
                    webpackError = err;
                }
        }))
        .pipe(gulp.dest('dist')) // non-minified version
        .pipe(gulp.dest('tests/manual/scripts')) // keep a copy in test too
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        })) // update extension to reflect minify update
        .pipe(gulp.dest('dist'))
        .pipe(
            ifElse(
                webpackError,
                // called if error is set
                function() {
                    return notify("Webpack Failed: "+err);
                },
                // called if no error
                function() {
                    return notify("Webpack Processed");
                }
            ) // send notification to OS
        )
        .pipe(notify("done"));
});
