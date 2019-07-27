// gulpプラグインの読み込み
const gulp = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass");
//postcssプラグインの読み込み
const postcss = require("gulp-postcss");
//autoprefixerプラグインの読み込み
const autoprefixer = require("autoprefixer");
//browserSyncプラグインの読み込み
const sourcemaps = require("gulp-sourcemaps");
//ソースマップを書き出すためのsourcemapの読み込み
const browserSync = require("browser-sync");
//webpackプラグインの読み込み
const webpackStream = require("webpack-stream");
const webpack = require("webpack");

// webpackの設定ファイルの読み込み
const webpackConfig = require("./webpack.config");

// style.scssの監視タスクを作成する
gulp.task('sass', function () {
  // ★ style.scssファイルを監視
  return gulp.watch('sass/*.scss', function () {
    // style.scssの更新があった場合の処理
    // style.scssファイルを取得
    return (
      gulp
      .src('sass/*.scss')
      // Sassのコンパイルを実行
      .pipe(
        sass({
          outputStyle: 'expanded'
        })
        // Sassのコンパイルエラーを表示
        // (これがないと自動的に止まってしまう)
        .on('error', sass.logError)
      )
      .pipe(sourcemaps.write({
        includeContent: false
      }))
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(postcss([
        autoprefixer({
          cascade: false
        })
      ]))
      .pipe(sourcemaps.write(''))
      // cssフォルダー以下に保存
      .pipe(gulp.dest('css'))
    );
  });
});

gulp.task('webpack', function () {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest("dist"));
});

// タスクの設定
gulp.task('browserSyncTask', function () {
  browserSync({
    server: {
      baseDir: './' // ルートとなるディレクトリを指定
    }
  });

  // srcフォルダ以下のファイルを監視
  gulp.watch('./**', function (cb) {
    browserSync.reload(); // ファイルに変更があれば同期しているブラウザをリロード
    // browserSyncのreload()が終わったことを通知する
    cb();
  });
});

// sassのタスクとbrowserSyncTaskを同時に実行する
gulp.task('default', gulp.parallel('sass', 'browserSyncTask'));
