const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const buffer = require('vinyl-buffer');

var jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'), //pretty output into console
    cssmin = require('gulp-cssmin'),
    sass = require('gulp-sass');

var srcPath = './assets';
var paths = {
    js: [srcPath + '/js/*.js'],
    sass: [srcPath + '/sass/*.scss'],
    css: [srcPath + '/css/*.css', '!' + srcPath + '/css/*.min.css']
};

gulp.task('jshint', function () {
    gulp.src(paths.js[0])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('js-babel', function(){
    return browserify({
        entries: './assets/js/main.js'
    })
        .transform(babelify.configure({
            presets : ['es2015']
        }))
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('build'))
});

gulp.task('js-minifier', function() {
    gulp.src(paths.js)
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(srcPath + '/js'));
});

var cssMin = function() {
    return gulp.src(paths.css)
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(srcPath + '/css'));
};

gulp.task('sass-compile', function() {
    gulp.src(paths.sass)
        .pipe(sass())
        .pipe(gulp.dest(srcPath + '/css'))
        .on('end', function(){
            cssMin();
        });
});


gulp.task('watch', function(){
    gulp.watch(paths.js, ['jshint', 'js-minifier']);
    gulp.watch(paths.sass, ['sass-compile']);
});

gulp.task('default', ['js-babel', 'jshint', 'sass-compile', 'watch']);