var gulp = require("gulp");

// Task Ragister
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
//var uglify = require('gulp-uglify');
//var pump = require('pump');
// var del = require('del');
var runSequence = require('run-sequence');

//sass Task
gulp.task('sass', function(){
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.reload({
                stream : true
            }))
});

// src variable
var vendorJSFiles =
    ["./bower_components/jquery/dist/jquery.js",
        "./bower_components/bootstrap/dist/js/bootstrap.js",
        "./src/script/bootstrap-datepicker/moment-with-locales.js",
        "./bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js",
        "./src/script/select/jquery.dd.js",
        "./src/script/datatable/jquery.dataTables.min.js",
        "./src/script/datatable/dataTables.responsive.js",
        "./src/script/wow-scroll/wow.min.js",
        "./src/script/select/select2.full.min.js",
        "./src/script/scroll/jquery.mCustomScrollbar.concat.min.js"]

// Load Concat task for JS files
gulp.task('vendorJS', function () {
    return gulp.src(vendorJSFiles)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./dist/assets/js/'));
});

// src variable
var vendorCSSFiles =
    ["./bower_components/bootstrap/dist/css/bootstrap.css",
        "./bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css"];

// Load Concat task for CSS files
gulp.task('vendorCSS', function () {
    return gulp.src(vendorCSSFiles)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./dist/assets/css/'));
});


// Load minify task for CSS files
gulp.task('minify-css', function () {
    return gulp.src('dist/assets/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/assets/css/'));
});

// Load uglify JS 
//gulp.task('compressJS', function (cb) {
//  pump([
//        gulp.src('dist/assets/js/*.js'),
//        uglify(),
//        gulp.dest('dist/assets/js/')
//    ],
//    cb
//  );
//});

//Clean Task
// gulp.task('clean:dist', function(){
//     return del.sync('dist')
// });

//Auto live reload Task
gulp.task('browserSync', function(){
    browserSync.init({
        server : {
            baseDir : 'dist'
        }
    })
});
 


gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('dist/*.html', browserSync.reload);
    // gulp.watch('dist/js/*.js', browserSync.reload);
});


gulp.task('default', function(callback){
    runSequence(['sass', 'browserSync', 'watch'],
    callback
    )
});
//gulp.task('build', function(callback){
//    runSequence(['vendorJS', 'vendorCSS', 'minify-css'],
//    callback
//    )
//});