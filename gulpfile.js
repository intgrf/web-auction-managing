const
    gulp = require('gulp'),
    del = require('del'), 
    less = require('gulp-less'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'), 
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    nodemon = require('gulp-nodemon'), 
    config = require('./config/gulp');


// delete previous versions of files
gulp.task('clean',  () => {
    return del(config.paths.dest);
});


gulp.task('dev:sslkeys', () => {
    return gulp.src(config.paths.sslkeys.src)
        .pipe(gulp.dest(config.paths.sslkeys.dest));
})
gulp.task('watch:sslkeys', () => {
    gulp.watch(config.paths.sslkeys.src, gulp.series('dev:sslkeys'));
    done();
})

//copy .pug files
gulp.task('dev:views', () =>  {
    return gulp.src(config.paths.views.src)
        .pipe(gulp.dest(config.paths.views.dest));
})
gulp.task('watch:views', (done) => {
    gulp.watch(config.paths.views.src, gulp.series('dev:views'));
    done();
})


//compile less
gulp.task('dev:styles', () => {
    return gulp.src(config.paths.styles.src)
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({
            basename: 'style',
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.paths.styles.dest));
})
gulp.task('watch:styles', (done) =>  {
    gulp.watch(config.paths.styles.src, gulp.series('dev:styles'));
    done();
})


//processing scripts
gulp.task('dev:scripts', () =>  {
    return gulp.src(config.paths.scripts.src, {
            sourcemaps: true
        })
        .pipe(concat('main.min.js'))
        .pipe(babel(config.plugins.babel))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.scripts.dest));
})
gulp.task('watch:scripts', (done) =>  {
    gulp.watch(config.paths.scripts.src, gulp.series('dev:scripts'));
    done();
})


//copy server files
gulp.task('dev:app', () =>  {
    return gulp.src(config.paths.app.src)
        .pipe(gulp.dest(config.paths.app.dest));
})
gulp.task('watch:app', (done) => {
    gulp.watch(config.paths.app.src, gulp.series('dev:app'));
    done();
})

/*
//Копируем картинки
gulp.task('dev:pictures', () =>  {
    return gulp.src(config.paths.pictures.src)
        .pipe(gulp.dest(config.paths.pictures.dest));
})
*/

/*
//run server
gulp.task('server',  (cb) => {
    var called = false;
    return nodemon(config.plugins.nodemon)
        .on('start', () =>  {
            if (!called) {
                called = true;
                cb();
            }
        })
});


function browserSyncInit(done) {
    browserSync.init(config.plugins.browserSync)
    done();
}
gulp.task('browser-sync', browserSyncInit);
*/

//processing all files
gulp.task('dev', gulp.parallel('dev:styles', 'dev:sslkeys', 'dev:views', 'dev:scripts', 'dev:app'));

//watching for files updates
gulp.task('watch', gulp.parallel('watch:styles', 'dev:sslkeys', 'watch:views', 'dev:scripts', 'dev:app'));

//default task
//gulp.task('default', gulp.series('clean', 'dev', 'server', gulp.parallel('watch', 'browser-sync')));
gulp.task('default', gulp.series('clean', 'dev', 'watch'));