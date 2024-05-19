import gulp, {src, dest, parallel, series} from 'gulp';

import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';
import webp from 'gulp-webp'
import sass from 'gulp-sass';
// import sass from 'sass';

import pug from 'gulp-pug';

export function defaultTask(cb) {
  cb();
}
// const sass = require('gulp-sass')(require('sass'));

export function css() {
  return src('./src/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(dest('./d/'));
}

export function html() {
  return src('./src/pug/*.pug')
  .pipe(pug())
  .pipe(dest('./d'));
}

export async function images() {

  return src('./src/images/**/*', { encoding: false })
  .pipe(imagemin([
    gifsicle({interlaced: true}),
    mozjpeg({quality: 55, progressive: true}),
    optipng({optimizationLevel: 1}),
    svgo({
      plugins: [
        {
          name: 'removeViewBox',
          active: true
        },
        {
          name: 'cleanupIDs',
          active: false
        }
      ]
    })
  ]))
  .pipe(webp())
  .pipe(dest('./d/opt-images'));
}

function watchFiles() {
  gulp.watch('./src/scss/*.scss', css);
  gulp.watch(['./src/pug/*.pug', './src/pug/*/*.pug'], html);
  gulp.watch('./d/images/**/*', images)
}

export const watch = watchFiles;