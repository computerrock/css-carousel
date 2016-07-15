'use strict';

// packages
var autoprefixer = require('gulp-autoprefixer');
var batch = require('gulp-batch');
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var tap = require('gulp-tap');
var watch = require('gulp-watch');

// config
var config = {
    SRC: './demo/scss/*.scss',
    DEST: './demo/css/'
};

// css build task
gulp.task('css', function() {
    var start = new Date();
    gulp.src(config.SRC)
        .pipe(plumber())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer('>0.001%'))
        .pipe(gulp.dest(config.DEST))
        .pipe(tap(function(file) {
            gutil.log('[css] ' + path.basename(file.path) + ' built in ' + (Date.now() - start) + 'ms');
        }));
});

// watchers
gulp.task('watch', function() {
    watch(config.SRC, batch(function(events, done) {
        gulp.start('css', done);
    }));
});

// workflow
gulp.task('dev', ['css', 'watch']);
gulp.task('prod', ['css']);
gulp.task('default', ['prod']);
