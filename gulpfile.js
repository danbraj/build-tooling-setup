const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('rollup-plugin-terser');
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const clean_css = require('gulp-clean-css');

//// CONSTANT VARIABLES

const PROJECT_DIR = './../11ty-website';

const STYLES_INPUT_PATH = PROJECT_DIR + '/src/sass/default-theme-development/{common,print}.scss';
const STYLES_WATCH_PATTERN = PROJECT_DIR + '/src/sass/default-theme-development/**/*.scss';
const STYLES_OUTPUT_PATH = PROJECT_DIR + '/build/res';

const COMMON_INPUT_PATH = PROJECT_DIR + '/src/scripts/common.js';
const COMMON_OUTPUT_PATH = PROJECT_DIR + '/build/res/common.js';

const SERVICEWORKER_INPUT_PATH = PROJECT_DIR + '/src/scripts/sw.js';
const SERVICEWORKER_OUTPUT_PATH = PROJECT_DIR + '/build/res/sw.js';

////

// compile scss in development
function developmentStylesheets() {
  return gulp.src(STYLES_INPUT_PATH)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(STYLES_OUTPUT_PATH))
}

// compile scss in development and watch them
function watchStylesheets() {
  gulp.watch(
    STYLES_WATCH_PATTERN, gulp.series(development)
  )
}

// compile scss in production
function buildStylesheets() {
  return gulp.src(STYLES_INPUT_PATH)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(clean_css())
    .pipe(gulp.dest(STYLES_OUTPUT_PATH))
}

async function buildJavascripts() {

  // common js file
  const b1 = await rollup.rollup({
    input: COMMON_INPUT_PATH,
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      }),
      terser.terser()
    ]
  });
  await b1.write({
    file: COMMON_OUTPUT_PATH,
    format: 'iife'
    // sourcemap: true
  });
  
  // service worker js file
  const b2 = await rollup.rollup({
    input: SERVICEWORKER_INPUT_PATH,
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      }),
      terser.terser()
    ]
  });
  await b2.write({
    file: SERVICEWORKER_OUTPUT_PATH,
    format: 'iife'
    // sourcemap: true
  });
}

async function buildAll() {
  return await gulp.parallel(buildStylesheets, buildJavascripts)();
}

// exports 
exports.dev = developmentStylesheets;
exports.watch = watchStylesheets;
exports.scssbuild = buildStylesheets;
exports.jsbuild = buildJavascripts;
exports.all = buildAll;