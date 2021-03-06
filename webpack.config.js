const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test' || ENV === 'test-watch';
const isProd = ENV === 'build';

let config = {};

config.entry = isTest ? void 0 : {
    app: './src/news/news-app.js'
};

config.externals = {
    angular: 'angular',
    'angular-resource': 'angular',
    'angular-route': 'angular',
    'angular-sanitize': 'angular',
};

config.output = isTest ? {} : {
    // Absolute output directory
    path: __dirname + '/dist',

    // Output path from the view of the page
    // Uses webpack-dev-server in development
    publicPath: '/',

    // Filename for entry points
    // Only adds hash in build mode
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

    // Filename for non-entry points
    // Only adds hash in build mode
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
};

if (isTest) {
    config.devtool = 'inline-source-map';
}
else if (isProd) {
    config.devtool = 'source-map';
}
else {
    config.devtool = 'eval-source-map';
}

// Initialize module
config.module = {
    rules: [{
        // JS LOADER
        // Reference: https://github.com/babel/babel-loader
        // Transpile .js files using babel-loader
        // Compiles ES6 and ES7 into ES5 code
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
    }, {
        test: /\.s?[ac]ss$/,
        use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: false, sourceMap: true } },
            // { loader: 'sass-loader', options: { sourceMap: true } }
        ],
    }, {
        // ASSET LOADER
        // Reference: https://github.com/webpack/file-loader
        // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
        // Rename the file using the asset hash
        // Pass along the updated reference to your code
        // You can add here any file extension you want to get copied to your output
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
    }, {
        // HTML LOADER
        // Reference: https://github.com/webpack/raw-loader
        // Allow loading html through js
        test: /\.html$/,
        loader: 'raw-loader'
    }]
};

// ISTANBUL LOADER
// https://github.com/deepsweet/istanbul-instrumenter-loader
// Instrument JS files with istanbul-lib-instrument for subsequent code coverage reporting
// Skips node_modules and files that end with .spec.js
if (isTest) {
    config.module.rules.push({
        enforce: 'pre',
        test: /\.js$/,
        exclude: [
            /node_modules/,
            /\.spec\.js$/
        ],
        loader: 'istanbul-instrumenter-loader',
        query: {
            esModules: true
        }
    })
}

/**
 * PostCSS
 * Reference: https://github.com/postcss/autoprefixer-core
 * Add vendor prefixes to your css
 */
// NOTE: This is now handled in the `postcss.config.js`
//       webpack2 has some issues, making the config file necessary

/**
 * Plugins
 * Reference: http://webpack.github.io/docs/configuration.html#plugins
 * List: http://webpack.github.io/docs/list-of-plugins.html
 */
config.plugins = [
    new MiniCssExtractPlugin({
        filename: "style.css"
    }),
    new webpack.LoaderOptionsPlugin({
        test: /\.scss$/i,
        options: {
            postcss: {
                plugins: [autoprefixer]
            }
        }
    })
];

// Skip rendering index.html in test mode
if (!isTest) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            inject: 'body'
        }),

        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files
        // Disabled when in test mode or not in build mode
        // new ExtractTextPlugin({filename: 'css/[name].css', disable: !isProd, allChunks: true})
    )
}

// Add build specific plugins
if (isProd) {
    config.plugins.push(
        // Reference: https://webpack.js.org/configuration/optimization/#optimization-noemitonerrors
        // Only emit files when there are no errors
        new webpack.NoEmitOnErrorsPlugin(),

        // Copy assets from the public folder
        // Reference: https://github.com/kevlened/copy-webpack-plugin
        new CopyWebpackPlugin([{
            from: __dirname + '/src/public'
        }])
    )
    config.optimization = config.optimization || {};
    config.optimization.minimize = true;
}

/**
 * Dev server configuration
 * Reference: http://webpack.github.io/docs/configuration.html#devserver
 * Reference: http://webpack.github.io/docs/webpack-dev-server.html
 */
config.devServer = {
    contentBase: './src/public',
    stats: 'minimal'
};

module.exports = config;