const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');


const name = 'main.scss';
const src = './scss';
const dest = './css';


const paths = {
    styles: {
        src: `${src}/${name}`,
        watch: `${src}/**/*.scss`,
        dest: dest
    }
};

gulp.task('sass', function () {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.styles.dest))
});

gulp.task('watch', function () {
    gulp.watch(paths.styles.watch, gulp.series('sass'));
});

gulp.task('default', gulp.series('sass'));