var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var mocha = require('gulp-mocha');
var del = require('del');
var less = require('gulp-less');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');
var managedBower = require('managed-bower');
var electron = require('electron-prebuilt')
var proc = require('child_process')

var paths = {
  bin : 'bin/',
  dist : 'dist/',
  distPublic : 'dist/public',
  src : 'src/',
  js : 'src/**/*.js',
  jsPublic : 'src/public/app.js',
  jsPublicAll : ['src/public/**/*.js', 'src/public/**/*.jsx'],
  html : 'src/**/*.html',
  less : ['src/public/style.less','src/public/**/*.css'],
  spec : 'src/**/*.spec.js',
  clean : ['dist/**/*']
};

var watches = [];

var packager = require('electron-packager')
function createElectronTask(platform) {
  gulp.task('electron:' + platform, function(done) {
    packager({
      dir : paths.dist,
      name : require('./' + paths.dist + 'package.json').name,
      platform : platform,
      arch : 'x64',
      version : '0.30.0',
      out : paths.bin,
      overwrite : true
    }, function(error, appPath){
      // console.log(appPath)
      done(error)
    })
  })
}

createElectronTask('linux')
createElectronTask('darwin')
createElectronTask('win32')

gulp.task('electron', gulpSequence('electron:linux', 'electron:darwin', 'electron:win32'))

function createGulpTask(taskName, options) {
  watches.push({
    src : options.src,
    task: taskName
  });
  gulp.task(taskName, function() {
    var stream = gulp.src(options.src);
    if (!!options.plugins)
      options.plugins.forEach(function(plugin) {
        if (!!plugin.bin)
          stream = stream.pipe(plugin.bin(plugin.options));
      });
    if (!!options.dest)
      stream = stream.pipe(gulp.dest(options.dest));
    return stream;
  });
}

createGulpTask('build:js', {
  src : [paths.js, '!' + paths.spec, '!' + paths.jsPublicAll[1]],
  dest : paths.dist,
  plugins : [{
    bin: babel
  }]
});

createGulpTask('build:jsPublic', {
  src : paths.jsPublicAll,
  dest : paths.distPublic,
  plugins : [{
    bin: babel
  }]
});

// gulp.task('build:jsPublic', function() {
//     browserify({
//       entries: paths.jsPublic,
//       debug: true
//     })
//     .transform(babelify, { stage: 0 })
//     .bundle()
//     .pipe(source('app.js'))
//     .pipe(gulp.dest(paths.distPublic));
// });

createGulpTask('test:js', {
  src : paths.spec,
  plugins : [{
    bin: babel
  },{
    bin : mocha
  }]
});

createGulpTask('build:html', {
  src : paths.html,
  dest : paths.dist,
  plugins : [{
    bin : managedBower,
    options : {
      directory : paths.distPublic + '/vendors'
    }
  }]
});

createGulpTask('build:less', {
  src : paths.less,
  dest : paths.distPublic,
  plugins : [{
    bin : less
  }]
});

gulp.task('clean', function (cb) {
  del([
    paths.dist + '!package.json',
    // '!' + paths.dist + 'package.json',
    paths.bin
  ], cb);
});

gulp.task('clean:all', function (cb) {
  del([
    paths.dist,
    'node_modules'
  ], cb);
});
// Use gulp-run to start a pipeline
gulp.task('run', function () {
  var p = proc.spawn(electron,['dist/main.js']);
});
gulp.task('runAndBuild', gulpSequence('build', 'run'));

gulp.task('serve', function () {
  nodemon({
    script: paths.dist + 'server.js',
    watch : paths.distPublic
    })
    .on('restart', function () {
//      console.log('restarted!');
    });
});

gulp.task('build', ['build:js', 'build:html', 'build:less', 'build:jsPublic']);

gulp.task('test', gulpSequence('build:js', 'test:js'));

gulp.task('watch', function() {
  gulp.start('build');
  watches.forEach(function(watch) {
    gulp.watch(watch.src, [watch.task]);
  });
  //  gulp.watch(paths.jsPublicAll, ['build:jsPublic']);
});

gulp.task('dev', gulpSequence('build', 'watch'));
gulp.task('bin', gulpSequence('clean', 'build', 'electron'));

gulp.task('default', ['dev']);

gulp.task('npm', function(cb) {
  cb();
});
