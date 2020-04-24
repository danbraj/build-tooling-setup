const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const clean_css = require('gulp-clean-css');
const dotenv = require('dotenv');

dotenv.config();

const SRC_PATH = process.env.STYLES_INPUT_PATH;
const WATCH_PATH = process.env.STYLES_WATCH_PATH;
const DEST_PATH = process.env.STYLES_OUTPUT_PATH;

// compile scss in development
function development() {
  return gulp.src(SRC_PATH)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DEST_PATH))
}

// compile scss in development and watch them
function watch() {
  gulp.watch(
    WATCH_PATH, gulp.series(development)
  )
}

// compile scss in production
function production() {
  return gulp.src(SRC_PATH)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(clean_css())
    .pipe(gulp.dest(DEST_PATH))
}

// exports 
exports.dev = development;
exports.watch = watch;
exports.build = production;