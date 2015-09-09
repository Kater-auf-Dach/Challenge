var
  gulp = require('gulp');
var
  jade = require('gulp-jade'),
  watch = require('gulp-watch'),
  rimraf = require('rimraf'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;
var
	postcss = require('gulp-postcss'),
	processors = [
		require('postcss-mixins'),
		require('postcss-simple-vars'),
		require('postcss-nested'),
		require('autoprefixer')({ browsers: ['last 2 versions', '> 2%'] })
	];

var path = {
  build: {
    jade: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },
  src: {
    jade: ['src/templates/*.jade', '!src/templates/_*.jade'],
    js: 'src/js/*.js',
    style: 'src/styles/*.css',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    jade: 'src/*.jade',
    js: 'src/js/**/*.js',
    styles: 'src/styles/*.css',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "KaufD"
};

// server
gulp.task('webserver', function () {
    browserSync(config);
});

// clean dest
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

// compile HTML
gulp.task('jade', function() {
    gulp.src(path.src.jade)
        .pipe(jade({
            pretty: true
        }))
        //.on('error', console.log)
    .pipe(gulp.dest(path.build.jade))
    .pipe(reload({stream: true}));
});

// compile CSS
gulp.task('css', function() {
  gulp.src(path.src.style)
    .pipe(postcss(processors))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

// compile JS
gulp.task('js', function () {
  gulp.src(path.src.js)
      .pipe(gulp.dest(path.build.js))
      .pipe(reload({stream: true}));
});

// images
gulp.task('images', function () {
  gulp.src(path.src.img)
      .pipe(imagemin({
        // progressive: true,
        // svgoPlugins: [{removeViewBox: false}],
        // use: [pngquant()],
        // interlaced: true
      }))
      .pipe(gulp.dest(path.build.img))
      .pipe(reload({stream: true}));
});

//copy fonts
gulp.task('fonts', function() {
  gulp.src(path.src.fonts)
      .pipe(gulp.dest(path.build.fonts))
});




// watcher
gulp.task('watch', function(){
  watch([path.watch.jade], function(event, cb) {
    gulp.start('jade');
  });
  watch([path.watch.styles], function(event, cb) {
    gulp.start('css');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('images');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts');
  });
})


gulp.task('dev', [
  'clean',
  'jade',
  'css',
  'js'
]);


gulp.task('build', [
  'clean',
  'jade',
  'css',
  'js',
  'images',
  'fonts'
]);

gulp.task('default', [
  'dev',
  'webserver',
  'watch'
]);