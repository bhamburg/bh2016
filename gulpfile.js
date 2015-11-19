var gulp = require('gulp'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
        less = require('gulp-less'),
   concatCSS = require('gulp-concat-css'),
        maps = require('gulp-sourcemaps'),
         del = require('del'),
     connect = require('gulp-connect');

gulp.task('concatScripts', function() {
  return gulp.src([
    'js/jquery.js',
    'js/bootstrap.js',
    'js/jquery.easing.js',
    'js/classie.js',
    'js/cbpAnimatedHeader.js',
    'js/jqBootstrapValidation.js',
    'js/contact_me.js',
    'js/agency.js',
    'js/reportcard.js',
    'js/animsition/js/animsition.min.js'
    ])
  .pipe(maps.init())
  .pipe(concat('app.js'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
  return gulp.src('js/app.js')
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('js'));
});

gulp.task('complileLess', function() {
  return gulp.src('less/style.less')
  .pipe(maps.init())
  .pipe(less())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('css'));
});

gulp.task('concatStyles', ['complileLess'], function() {
  return gulp.src([
    'css/bootstrap.min.css',
    'css/animate.min.css',
    'js/animsition/css/animsition.min.css',
    'css/style.css'
    ])
  .pipe(concatCSS('bundle.css'))
  .pipe(gulp.dest('css'));
});

gulp.task('watchFiles', function() {
  gulp.watch('less/*.less', ['concatStyles']);
  gulp.watch('js/*.js', ['minifyScripts']);
});

gulp.task('serve', ['watchFiles'], function() {
  connect.server();
});

gulp.task('clean', function() {
  del(['css/bundle.css','css/style.css*','js/app*.js*']);
});

gulp.task('build', ['minifyScripts','concatStyles']);

gulp.task('default', ['clean'], function(){
  gulp.start('build');
});
