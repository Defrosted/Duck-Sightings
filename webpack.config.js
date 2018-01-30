const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLess = new ExtractTextPlugin( {
    filename: '[name].css'
});

module.exports = {
    entry: [
        __dirname + '/src/js/App.js',
        __dirname + '/src/css/style.less'
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
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                  'url-loader?limit=10000',
                  'img-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlPlugin({
            template: 'src/index.html'
        }),
        extractLess
    ]
}