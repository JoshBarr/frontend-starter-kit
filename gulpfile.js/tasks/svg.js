var config = require('../config');
var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var size = require('gulp-size');
var rename = require('gulp-rename');
var inject = require('gulp-inject');

gulp.task('svg', function() {
    return gulp
        .src(path.join(config.paths.svg, '**', '*.svg'))
        .pipe(rename({ prefix: 'i-' }))
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(size({ title: 'SVG', gzip: config.prod }))
        .pipe(gulp.dest(config.paths.images));
});

gulp.task('svg:inline', function() {
    var svgs = gulp
        .src(path.join(config.paths.svg, '**', '*.svg'))
        .pipe(rename({ prefix: 'i-' }))
        .pipe(svgmin())
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(size({ title: 'SVG', gzip: config.prod }));

    function fileContents(filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src(path.join(config.paths.views, 'index.html'))
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest(config.paths.views));
});
