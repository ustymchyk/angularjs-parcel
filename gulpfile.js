import gulp from 'gulp';
import through from 'through2';
import path from 'path';
import htmlmin from 'gulp-htmlmin';
import concat from 'gulp-concat';
import inject from 'gulp-inject-string';
import pug from 'gulp-pug';

const templatesGlob = './markup/components/*.pug';
const camelize = (s) => s.replace(/-./g, (x) => x[1].toUpperCase());

function generateTemplates() {
  return gulp
    .src(templatesGlob)
    .pipe(pug({}))
    .pipe(htmlmin({ collapseWhitespace: true, quoteCharacter: "'" }))
    .pipe(
      through.obj((file, enc, cb) => {
        const filename = path.parse(file.path).name;
        file.contents = Buffer.from(`"${camelize(filename)}": "${file.contents}"`);

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

export default function () {
  const options = { events: 'all', ignoreInitial: false };
  const tasks = [generateTemplates, generateComponentImports];
  gulp.watch(templatesGlob, options, gulp.parallel(tasks));
}
