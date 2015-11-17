'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function() {
  return gulp.src('test/*.js')
             .pipe(mocha({reporter: 'nyan'}))
             .once('end', function(){
                process.exit();
              });
});

gulp.task('watch', function() {
  gulp.watch(['*.js', 'routes/*js', 'models/*js'], ['test'])
});

gulp.task(('default'), ['test', 'watch'], function() {});
