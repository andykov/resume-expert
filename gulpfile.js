"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
// const cp = require("child_process");
const cssnano = require("cssnano");
const del = require("del");
const eslint = require("gulp-eslint");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const webpack = require("webpack");
const webpackconfig = require("./webpack.config.js");
const webpackstream = require("webpack-stream");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean assets
function clean() {
  return del(["./dist/assets/"]);
}

// Optimize Images
function images() {
  return gulp
    .src("./assets/img/**/*")
    .pipe(newer("./dist/assets/img"))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest("./dist/assets/img"));
}

// CSS task
function css() {
  return gulp
    .src("./assets/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./dist/assets/css/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("./dist/assets/css/"))
    .pipe(browsersync.stream());
}

// Lint scripts
function scriptsLint() {
  return gulp
    .src(["./assets/js/**/*", "!./assets/js/vendors/*", "./gulpfile.js"])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
      .src(["./assets/js/**/*", "!./assets/js/vendors/*"])
      .pipe(plumber())
      .pipe(webpackstream(webpackconfig, webpack))
      // folder only, filename is specified in webpack config
      .pipe(gulp.dest("./dist/assets/js/"))
      .pipe(browsersync.stream())
  );
}
function scriptsVendors() {
  return (
    gulp
      .src(["./assets/js/vendors/*"])
      .pipe(gulp.dest("./dist/assets/js/vendors"))
      .pipe(browsersync.stream())
  );
}

// Jekyll
// function jekyll() {
//   return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" });
// }

// HTML task
function html() {
  return gulp
    .src("./assets/html/**/*.html")
    .pipe(gulp.dest("./dist/assets/html/"))
    .pipe(browsersync.stream());
}

// HTML task
function fonts() {
  return gulp
    .src("./assets/fonts/**/*.*")
    .pipe(gulp.dest("./dist/assets/fonts/"))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./assets/scss/**/*", gulp.series(css, browserSyncReload));
  gulp.watch("./assets/fonts/**/*.*", fonts);
  // gulp.watch("./assets/js/**/*", gulp.series(scriptsLint, scripts));
  gulp.watch(["./assets/js/**/*", "!./assets/js/vendors/*"], gulp.series(scripts, browserSyncReload));
//   gulp.watch(
//     [
//       "./_includes/**/*",
//       "./_layouts/**/*",
//       "./_pages/**/*",
//       "./_posts/**/*",
//       "./_projects/**/*"
//     ],
//     gulp.series(jekyll, browserSyncReload)
//   );
  gulp.watch("./assets/html/**/*", gulp.series(html, browserSyncReload));
  gulp.watch("./assets/img/**/*", images);
}

// define complex tasks
// const js = gulp.series(scriptsLint, scripts);
const js = gulp.series(scripts);
const build = gulp.series(clean, gulp.parallel(css, images, html, js, scriptsVendors, fonts));
// const build = gulp.series(clean, gulp.parallel(css, images, jekyll, js));
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.images = images;
exports.css = css;
exports.js = js;
exports.scriptsVendors = scriptsVendors;
exports.fonts = fonts;
exports.html = html;
// exports.jekyll = jekyll;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;