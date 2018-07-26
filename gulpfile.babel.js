import gulp from "gulp";
import del from "del";
import ts from "gulp-typescript";
import { spawn } from "child_process";

const tsProject = ts.createProject('tsconfig.json');

export function compile() {
  return tsProject.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest('dist'));
}

export function clean() {
  return del(['dist']); 
}

export function watch() {
  return gulp.watch("src/**/*.ts", build)
    .on("error", console.error.bind(console));
}

let node;

const server = function() {
  if(node) node.kill();
  node = spawn('node', ['dist/app/index.js'], {stdio: 'inherit'});
  node.on('close', (code) => {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  })
}

export function liveServer() {
  server();

  return gulp.watch("src/**/*.ts", gulp.series(build, (done) => {
    server();
    done();
  })).on("error", (error) => {
    gulp.log(error);
    if(node) node.kill();
  });
}

const build = gulp.series(clean, compile);

gulp.task('build', build);
gulp.task('server', liveServer);

export default build;
