import gulp, {src, dest, parallel, series} from 'gulp';

import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';
import webp from 'gulp-webp'
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

import pug from 'gulp-pug';
import terser from 'gulp-terser';
import rename from 'gulp-rename';

export function defaultTask(cb) {
  cb();
}

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

export function js() {
  return src('./d/javascript/*')
    .pipe(terser())
    .pipe(rename((e) => {
      e.basename += "-min"
    }))
    .pipe(dest('./d/ugly-js'))
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
  gulp.watch('./d/images/**/*', images);
  gulp.watch('./d/javascript/*', js)
}

export const watch = watchFiles;