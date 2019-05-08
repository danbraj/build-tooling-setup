const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const config = require('./config.js');


if (!Array.isArray(config.entries) || config.entries.length == 0) return;
const names = config.entries.length > 1 ? `{${config.entries.join()}}` : config.entries[0];
const paths = {
    src: `${config.src}/${names}.scss`,
    watch: `${config.src}/**/*.scss`,
    dest: config.dest,
    baseDir: config.baseDir
};

function development() {
    return src(paths.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(paths.dest))
}

function compile() {
    return src(paths.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(dest(paths.dest))
}

function sasswatch() {
    watch(paths.watch, series(development))
}

// browsersync

function devWithBrowserSync() {
    return src(paths.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(paths.dest))
        .pipe(browserSync.stream())
}

function sync() {
    browserSync.init({
        server: {
            baseDir: paths.baseDir
        }
    });
    watch(paths.watch, devWithBrowserSync);
    watch(`${paths.baseDir}*.html`).on('change', browserSync.reload);
}

// exports

exports.sync = sync;
exports.compile = compile;
exports.watch = sasswatch;
exports.default = development;