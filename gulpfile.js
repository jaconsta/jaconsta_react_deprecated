var $        = require('gulp-load-plugins')();
var argv     = require('yargs').argv;
var gulp     = require('gulp');
var rimraf   = require('rimraf');
var sequence = require('run-sequence');
var browser  = require('browser-sync');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');


// Check for --production flag
var isProduction = !!(argv.production);

// Port to use for the development server.
var PORT = 8000;

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

// Compile Sass into CSS
gulp.task('sass', function(){

  return gulp.src('src/assets/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: ['node_modules/skeleton-scss/scss']
    }))
    .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
    .pipe(gulp.dest('dist/assets/css'))
});

// Delete the "dist" folder at start
gulp.task('clean', function(done) {
  rimraf('dist', done);
});

// Hadle html files
gulp.task('pages', function() {
  return gulp.src('./src/pages/**/*.html')
    .pipe(gulp.dest('dist'))
});

// Combine JavaScript into one file
// In production, the file is minified
gulp.task('javascript', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  var b = browserify({
    entries: './src/assets/js/app.js',
    debug: true
  });

  return b.transform('babelify', {presets: ["es2015", "react", "stage-2"]})
    .bundle()
    .pipe(source('./app.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .on('error', console.log)
    .pipe(uglify)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('dist/assets/js'));
});

// Run all compilation taks and build the "dist" folder 
gulp.task('build', function(done) {
  sequence('clean', ['pages', 'sass', 'javascript'], done);
});

// Start a server with LiveReload
gulp.task('server', ['build'], function() {
  browser.init({
    server: 'dist', port: PORT
  });
});

// Build and watch
gulp.task('default', ['build', 'server'], function() {
  gulp.watch(['src/pages/**/*.html'], ['pages', browser.reload]);
  gulp.watch(['src/assets/scss/**/*.scss'], ['sass', browser.reload]);
  gulp.watch(['src/assets/js/**/*.js'], ['javascript', browser.reload]);
});
