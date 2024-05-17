// import { gulpImagemin } from "\node_modules\gulp-imagemin\index.js";
function defaultTask(cb) {
  cb();
}

exports.default = defaultTask;

const {src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
// const imagemin = require('gulp-imagemin');
// const webp = require('imagemin-webp');
const rename = require('gulp-rename');

function css() {
  return src('./src/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(dest('./d/'));
}

exports.css = css;

const pug = require('gulp-pug');

function html() {
  return src('./src/pug/*.pug')
    .pipe(pug())
    .pipe(dest('./d'));
}

exports.html = html;

//gulp.task('imagemin-webp', function() {
//  return gulp.src('d/images/**/*.{jpg,png}')
//    .pipe(imagemin([webp({ quality: 75 })]))
//    .pipe(gulp.dest('min_images'));
//});

// exports[imagemin-webp] = imagemin;

function watchFiles() {
  watch('./src/scss/*.scss', css);
  watch(['./src/pug/*.pug', './src/pug/*/*.pug'], html);
}

exports.watch = watchFiles;