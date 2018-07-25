var gulp 		= require('gulp');
var clean 	= require('gulp-clean');
var ts 			= require('gulp-typescript');
var nodemon	= require('gulp-nodemon');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('compile', ['clean'], function () {
	return tsProject.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
	return gulp.src('dist')
		.pipe(clean());
});

gulp.task('watch', ['compile'], function () {
  gulp.watch("src/**/*.ts", ['compile'])
    .on("error", console.error.bind(console));
});

gulp.task('nodemon', ['compile'], function() {
  return nodemon({
    tasks: ['compile'],
    script: "dist/app/index.js",
    watch: [
      'src'
    ],
    nodeArgs: []
  })
});

gulp.task('default', ['compile']);