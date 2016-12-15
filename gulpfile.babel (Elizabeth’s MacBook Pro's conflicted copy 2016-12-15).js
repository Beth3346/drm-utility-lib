import gulp from 'gulp';
import del from 'del';
import jshint from 'gulp-jshint';
import babel from 'gulp-babel';
import path from 'path';
import mocha from 'gulp-mocha';
import plumber from'gulp-plumber';
import notify from'gulp-notify';
import through from'through2';

gulp.task('clean:scripts', function() {
    return del([
        'dist/'
    ]);
});

gulp.task('jshint', ['test'], function() {
    return gulp.src(['src/main.js'])
        .pipe(jshint())
    // Use gulp-notify as jshint reporter
    .pipe(notify(function (file) {
      if (file.jshint.success) {
        // Don't show something if success
        return false;
      }

      var errors = file.jshint.results.map(function (data) {
        if (data.error) {
          return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
      }).join("\n");
      return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    }));
        // .pipe(jshint.reporter('default'));
});

gulp.task('babel', ['jshint'], function() {
    return gulp.src(['src/main.js', 'main.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(`dist`));
});

gulp.task('scripts', ['babel'], function() {
    return gulp.src(['dist/main.js'])
        .pipe(gulp.dest(`dist`))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('test', function() {
  return gulp.src(['test/test.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec'
    }))
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}));
    // .pipe(through(function () {
    //     this.emit("error", new Error("Something happend: Error message!"))
    // }));
});

gulp.task('default', ['scripts']);
gulp.task('watch', ['scripts'], () => {
    gulp.watch(['src/**/*.js', 'test/**/*.js'], ['scripts']);
});