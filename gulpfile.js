var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('concatScripts', function() {
  gulp.src([
    'js/jquery.js',
    'js/bootstrap.js',
    'js/jquery.easing.js',
    'js/classie.js',
    'js/cbpAnimatedHeader.js',
    'js/jqBootstrapValidation.js',
    'js/contact_me.js',
    'js/agency.js'
    ])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', function() {
  gulp.src('js/app.js')
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('js'));
});

gulp.task('default', ['concatScripts', 'minifyScripts'], function() {
  console.log('Doing all the things!');
});
