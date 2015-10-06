var gulp = require('gulp');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync');

gulp.task('default', ['sass', 'lint', 'browsersync'])

    gulp.task('sass', function(){
            gulp.src('./styles/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./styles'))
    });

gulp.task('lint', function () {
    return gulp.src(['*/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('browsersync', function() {
   browserSync.init(["./styles/*.css", "./scripts/*.js"], {
        server: {
            baseDir: "./"
        }
    });

   //watches toevoegen
});



