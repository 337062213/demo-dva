const path = require('path');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: 'build.js',
    },
    // mode: "production",
    module:{
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin({
            filename: 'style.css'
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            parallel: true
        }),
        new HtmlWebpackPlugin({
            filename: path.join(process.cwd(), 'dist/index.html'),
            template: 'index-build.html',
            inject: false,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: 'static',
                ignore: ['.*']
            }
        ]),
    ]
});