function defaultTask(cb) {
  cb();
}

exports.default = defaultTask;

const {src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function css() {
  return src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
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

function watchFiles() {
  watch('./src/scss/*.scss', css);
  watch(['./src/pug/*.pug', './src/pug/*/*.pug'], html);
}

exports.watch = watchFiles;