const del = require('del');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');

const babelConfig = {
  presets: ['@babel/env']
};

gulp.task('clear-dist', () => {
  return del([
    '../multiselect-dropdown.css',
    '../index.js',
    '../multiselect-dropdown.min.js'
  ], {
    force: true
  });
});

gulp.task('css', () => {
  return gulp.src('../src/**/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('../'));
});

gulp.task('build-module', () => {
  return gulp.src('../src/multiselect-dropdown.module.js')
    .pipe(babel(babelConfig))
    .pipe(uglify())
    .pipe(rename('index.js'))
    .pipe(gulp.dest('../'));
});

gulp.task('build-script', () => {
  return gulp.src('../src/multiselect-dropdown.script.js')
    .pipe(babel(babelConfig))
    .pipe(uglify())
    .pipe(rename('multiselect-dropdown.min.js'))
    .pipe(gulp.dest('../'));
});

gulp.task('default', gulp.series('clear-dist', 'build-module', 'build-script', 'css'));
