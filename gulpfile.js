const gulp = require('gulp');
const through = require('through2');
const path = require('path');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const inject = require('gulp-inject-string');

const templatesGlob = './markup/components/*.html';

function generateTemplates() {
  return gulp
    .src(templatesGlob)
    .pipe(htmlmin({ collapseWhitespace: true, quoteCharacter: "'" }))
    .pipe(
      through.obj((file, enc, cb) => {
        const filename = path.parse(file.path).name;
        file.contents = Buffer.from(`"${filename}": "${file.contents}"`);

        cb(null, file);
      })
    )
    .pipe(concat('templates.js', { newLine: ',' }))
    .pipe(inject.wrap('export default {', '}'))
    .pipe(gulp.dest('./src/utils/'));
}

function generateComponentImports() {
  return gulp
    .src(templatesGlob)
    .pipe(
      through.obj((file, enc, cb) => {
        const filename = path.parse(file.path).name;
        file.contents = Buffer.from(`export * from './components/${filename}';`);

        cb(null, file);
      })
    )
    .pipe(concat('component-imports.js'))
    .pipe(gulp.dest('./src/'));
}

exports.default = function () {
  const options = { events: 'all', ignoreInitial: false };
  const tasks = [generateTemplates, generateComponentImports];
  gulp.watch(templatesGlob, options, gulp.parallel(tasks));
};
