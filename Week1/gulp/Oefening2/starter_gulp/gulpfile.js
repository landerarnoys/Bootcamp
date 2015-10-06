var gulp = require('gulp');
var less = require('gulp-less');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var wiredep = require('wiredep').stream;
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var gulpif = require('gulp-if');

gulp.task('bower',function(){
    gulp.src('./index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('.'));
});



gulp.task('html', function(){
    var assets = useref.assets();
      return gulp.src('./*.html')
      .pipe(assets)
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minify()))
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['less','connect','watch', 'bower', 'html']);

gulp.task('less', function(){
    return gulp.src('./styles/*.less')
    .pipe(less())
    .pipe(gulp.dest('./styles'))
});

gulp.task('connect',function(){
    connect.server({
        livereload: true
    });
});

gulp.task('watch', function(){
    gulp.watch(['./*.html'],['reload']);
    gulp.watch(['**/*.less'], function(){
        runSequence('less','reload');
    });
});

gulp.task('reload',function(){
     return gulp.src('.').pipe(connect.reload());
});

