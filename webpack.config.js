const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLess = new ExtractTextPlugin( {
    filename: '[name].css'
});

module.exports = {
    entry: [
        __dirname + '/src/static/js/App.js',
        __dirname + '/src/static/css/style.less'
    ],

    output: {
        filename: 'App.js',
        path: __dirname + '/build'
    },

    devtool: 'source-map',

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                })
            }
        ]
    },

    plugins: [
        new HtmlPlugin({
            template: 'src/static/index.html'
        }),
        extractLess
    ]
}