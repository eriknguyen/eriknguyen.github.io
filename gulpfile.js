var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    minifyHTML = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    fs = require('fs'),
    path = require('path'),
    merge = require('merge-stream'),
    imagemin = require('gulp-imagemin'),
    clean = require('del'),
    browserSync = require('browser-sync').create();

var paths = {
    html: {
        src: 'dev/**/*.html',
        dest: './templates'
    },
    js: {
        folder: 'dev/assets/js',
        src: ['dev/assets/js/**/*.js', 'dev/assets/js/*.js', 'dev/assets/js/vendor/*.js'],
        dest: './static/js',
        vendor: 'dev/assets/js/vendor/**/*.js'
    },
    styles: {
        src: 'dev/assets/scss/**/*.scss',
        dest: './static/css'
    },
    image: {
        src: 'dev/assets/img/*',
        dest: './static/img'
    },
    font: {
        src: 'dev/assets/font/**/*',
        dest: './static/font'
    }
};

gulp.task('html', function() {
    return gulp.src(paths.html.src)
        .pipe(minifyHTML())
        .on('error', function(err) {
            displayError(err);
        })
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function() {
    var folders = getFolders(paths.js.folder);
    var tasks = folders.map(function(folder) {
        return gulp.src(path.join(paths.js.folder, folder.path, '/*.js'))
            .pipe(uglify())
            .pipe(concat(folder.name + '.min.js'))
            .on('error', function(err) {
                displayError(err);
            })
            .pipe(gulp.dest(paths.js.dest));
    });
    merge(tasks);
    browserSync.reload();
});

gulp.task('sass', function() {
    return gulp.src(paths.styles.src)
        .pipe(sass({
            outputStyle: 'compressed'/*,
            sourceComments: 'map'*/
        }))
        .pipe(autoprefix())
        .on('error', function(err) {
            displayError(err);
        })
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('font', function() {
    return gulp.src(paths.font.src)
        .pipe(gulp.dest(paths.font.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('image', function() {
    return gulp.src(paths.image.src)
        .pipe(imagemin())
        .on('error', function(err) {
            displayError(err);
        })
        .pipe(gulp.dest(paths.image.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browserSync', function() {
    browserSync.init({
        reloadDelay: 500,
        // scrollProportionally: true,
        port: 3010,
        notify: false,
        ui : {
            port: 3000
        },
        proxy: 'localhost:5000'
    });
});

gulp.task('watch', function() {
    gulp.watch(paths.html.src, ['html']);
    gulp.watch(paths.js.src, ['js']);
    gulp.watch(paths.styles.src, ['sass']);
    gulp.watch(paths.image.src, ['image']);
    gulp.watch(paths.font.src, ['font']);
});

// gulp.task('watch', function() {
//     gulp.watch(paths.html.src, ['html']).on('change', function(event) {
//         watchConfig(event);
//     });
//     gulp.watch(paths.js.src, ['js']).on('change', function(event) {
//         watchConfig(event);
//     });
//     gulp.watch(paths.styles.src, ['sass']).on('change', function(event) {
//         watchConfig(event);
//     });
//     gulp.watch(paths.image.src, ['image']).on('change', function(event) {
//         watchConfig(event);
//     });
//     gulp.watch(paths.font.src, ['font']).on('change', function(event) {
//         watchConfig(event);
//     });
// });

gulp.task('clean', function() {
    clean('templates/**/*');
    clean('static/**/*')
});
gulp.task('default', ['html', 'js', 'sass', 'image', 'browserSync', 'watch']);
gulp.task('build', ['clean', 'html', 'js', 'sass', 'image', 'font']);

var getFolders = function(dir) {
    var folders = [{
        path: '',
        name: 'app'
    }];
    var folder = fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
    for (var i = 0; i < folder.length; i++) {
        folders.push({
            path: folder[i],
            name: folder[i]
        });
    }
    return folders;
};

var displayError = function(error) {
    var errorString = '[ERROR][' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n", ''); // Removes new line at the end
    if (error.fileName)
        errorString += ' in ' + error.fileName;
    if (error.lineNumber)
        errorString += ' on line ' + error.lineNumber;
    console.error(errorString);
};


var watchConfig = function(event) {
    if (event.type === 'deleted') {
        // simulate the source folder, used with gulp.src in the scripts task
        var filePathFromSrc = path.relative(path.resolve('dev'), event.path);
        console.log(filePathFromSrc);
        // concatenating the destication folder absolute path, used by gulp.dest
        var destFilePath = path.resolve('dist', filePathFromSrc);
        console.log(destFilePath);
        clean.sync(destFilePath);
    }
    browserSync.reload();
};
