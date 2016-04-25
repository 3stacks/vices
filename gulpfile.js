const gulp = require('gulp');
const sass = require('gulp-sass');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const rimraf = require('rimraf');
const notify = require('gulp-notify');
const runSequence = require('run-sequence');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const nested = require('postcss-nested');
const vars = require('postcss-simple-vars');
const extend = require('postcss-simple-extend');
const cssnano = require('cssnano');
const htmlReplace = require('gulp-html-replace');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

const paths = {
	bundle: 'app.js',
	entry: 'src/js/index.js',
	source: 'src/',
	srcCss: 'src/**/*.scss',
	srcImg: 'src/images/**',
	srcLint: ['src/**/*.js', 'test/**/*.js'],
	dist: 'dist',
	distJs: 'dist/js',
	distImg: 'dist/images',
	distDeploy: './dist/**/*'
};

const customOpts = {
	entries: [paths.entry],
	debug: true,
	cache: {},
	packageCache: {}
};

gulp.task('sass', function() {
	gulp.src(paths.source + 'sass/style.scss')
		.pipe(sass({
		}))
		.pipe(gulp.dest(paths.dist + '/'))
});

gulp.task('migrate', function() {
	gulp.src([
		paths.source + 'font/**/*',
		paths.source + 'img/**/*'
	], {base: paths.source})
		.pipe(gulp.dest(paths.dist))
});

const opts = Object.assign({}, watchify.args, customOpts);

gulp.task('clean', cb => {
	rimraf('dist', cb);
});

gulp.task('html', function() {
	gulp.src(paths.source + 'html/index.html')
		.pipe(gulp.dest(paths.dist))
});

gulp.task('watchify', () => {
	const bundler = watchify(browserify(opts));

	function rebundle() {
		return bundler.bundle()
			.on('error', notify.onError())
			.pipe(source(paths.bundle))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(paths.distJs))
	}

	bundler.transform(babelify)
		.on('update', rebundle);
	return rebundle();
});

gulp.task('browserify', () => {
	browserify(paths.entry, { debug: true })
		.transform(babelify)
		.bundle()
		.pipe(source(paths.bundle))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.distJs));
});

gulp.task('htmlReplace', () => {
	gulp.src('index.html')
		.pipe(htmlReplace({ css: 'styles/main.css', js: 'js/app.js' }))
		.pipe(gulp.dest(paths.dist));
});

gulp.task('watch', cb => {
	runSequence('clean', ['watchify', 'html', 'sass', 'migrate'], cb);
});

gulp.task('build', cb => {
	process.env.NODE_ENV = 'production';
	runSequence('clean', ['browserify', 'styles', 'htmlReplace', 'images'], cb);
});