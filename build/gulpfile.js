const del = require('del');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const cleanCss = require('gulp-clean-css');

gulp.task('clear-dist', () => {
  return del('./dist/*');
});

gulp.task('create-index', () => {
  return new Promise(resolve => {
    const fs = require('fs');
    if (!fs.existsSync('../index.js')) {
      fs.writeFileSync('../index.js', 'export * from \'./dist/multiselect-dropdown.js\';');
    }
    resolve();
  });
});

gulp.task('css', () => {
  return gulp.src('../src/**/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('../'));
});

gulp.task('build', () => {
  return gulp.src('../src/multiselect-dropdown.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('../dist'));
});

gulp.task('default', gulp.series('clear-dist', 'build', 'css', 'create-index'));
