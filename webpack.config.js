const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
    entry: __dirname + '/src/static/js/App.js',

    output: {
        filename: 'App.js',
        path: __dirname + '/build'
    },

    devtool: 'source-map',

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },

    plugins: [
        new HtmlPlugin({
            template: 'src/static/index.html'
        })
    ]
}