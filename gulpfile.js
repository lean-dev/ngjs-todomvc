
const gulp = require('gulp');

// NPM deps
const Browser = require('browser-sync');
const webpack = require("webpack");
const rimraf  = require('rimraf');

// Setup tools
const browser = Browser.create();

// Webpack Plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Build Tasks
// * pages
// * server
// * deps

gulp.task(function pages() {
    return gulp.src('./src/app/index.html')
        .pipe(gulp.dest('./.tmp'));
});

gulp.task(function server() {
    var config = {
        server: '.tmp',
        open: true
    };

    browser.init(config);
});

gulp.task(function deps(done) {
    var config = {
        entry: {
            'js/vendor': './src/scripts.js',
            'css/vendor':  './src/styles.css'
        },
        output: {
            path: __dirname + '/.tmp',
            filename: '[name].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('[name].bundle.css'),
        ]
    };

    webpack(config, function (err) {
        if (err) console.log('Webpack', err);
        rimraf('./.tmp/css/vendor.bundle.js', function() {});
        done();
    });

});

// Main Tasks
// * build (default)
// * serve
// * dev


gulp.task('build', gulp.series('pages','deps'));

gulp.task('default', gulp.series('build'));

gulp.task('serve', gulp.series('build','server'));

gulp.task('dev', gulp.series('serve'));
