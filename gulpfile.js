const { series, parallel, src, dest, watch } = require('gulp');
const browserSync  = require('browser-sync').create()
const sass         = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer') 
const rename       = require('gulp-rename') 
const mediaqueries = require('gulp-group-css-media-queries')
const includefile  = require('gulp-file-include') 
const imagemin     = require('gulp-imagemin') 
const del          = require('del'); 
const config = require('./config');


let source_folder = 'src';
let project_folder = 'build';

let path = { 
	app: {
		html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
		scss: source_folder + '/scss/main.scss',
		js: source_folder + '/js/app.js',
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
		fonts: source_folder + '/fonts/*.ttf'
	},
	watch: {
		html: source_folder + '/**/*.html',
		scss: source_folder + '/scss/**/*.scss',
		blocks: source_folder + '/blocks/**/*.scss',
		js: source_folder + '/js/**/*.js',
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
	},
	build: {
		html: project_folder + '/',
		css: project_folder + '/css/',
		js: project_folder + '/js/',
		img: project_folder + '/img/',
		fonts: project_folder + '/fonts/'
	},
	clean: './' + project_folder + '/'
}

function htmlBuild() {
	return src(path.app.html)
		.pipe(includefile())
		.pipe(dest(path.build.html))
		.pipe(browserSync.stream())
}
exports.htmlBuild = htmlBuild;

function scssBuild() {
	return src(path.app.scss)
		.pipe(
			sass ({
				outputStyle: 'compressed',
			})
		)
		.pipe(mediaqueries())
		.pipe(
			autoprefixer ({
				overrideBrowserslist: ['last 5 versions'],
				grid: true,
				cascade: true
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browserSync.stream())
}
exports.scssBuild = scssBuild

function jsBuild() {
	return src(path.app.js)
		.pipe(includefile())
		.pipe(rename('app.js'))
		.pipe(dest(path.build.js))
		.pipe(browserSync.stream())
}
exports.jsBuild = jsBuild;

function imgBuild() {
	return src(path.app.img)
	.pipe(
		imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			interlaced: true,
			optimizationLevel: 5
		})
		)
	.pipe(dest(path.build.img))
	.pipe(browserSync.stream())
}
exports.imgBuild = imgBuild;

function cleanDistFolder() {
	return del(path.clean);
}
function reload(done) {
	browserSync.reload();
	done();
}

function serve() {
	browserSync.init ({
		server: {
			baseDir: './' + project_folder + '/',
		},
		port: 3000,
		notify: false,
		online: true,
	})

	watch([path.watch.html], {
		events: ['change'],
		delay: 100,
	},
	series (
		htmlBuild,
		reload
	));
	watch([path.watch.scss], {
		events: ['change'],
		delay: 100,
	},
	series (
		scssBuild,
		reload
	));
	watch([path.watch.blocks], {
			events: ['change'],
			delay: 100,
		},
		series (
			scssBuild,
			reload
		));
	watch([path.watch.js], {
		events: ['change'],
		delay: 100,
	},
	series (
		jsBuild,
		reload
	));
	watch([path.watch.img], {
		events: ['change', 'add'],
		delay: 100,
	},
	series (
		imgBuild,
		reload
	));
}

exports.build = series (
	cleanDistFolder,
	parallel(htmlBuild, scssBuild, jsBuild),
	imgBuild,
)

exports.default = series (
	cleanDistFolder,
	parallel(htmlBuild, scssBuild, jsBuild),
	imgBuild,
	serve,
)