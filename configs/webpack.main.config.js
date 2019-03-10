const path = require('path');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.common.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = merge.smart(baseConfig, {
    devtool: 'source-map',
    mode: 'production',
    target: 'electron-main',
    entry: path.join(__dirname, '..', 'src', 'app', 'main', 'main.ts'),
    output: {
        filename: 'main.js'
    },
    optimization: {
        minimizer: process.env.NODE_ENV === 'development' ? [] : [
            new TerserPlugin({
                parallel: true,
                sourceMap: true,
                cache: true
            })
        ]
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: process.env.NODE_ENV,
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '..', 'src', 'app', 'main', 'app.html'),
            filename: 'app.html',
            inject: false,
        }),
        new CopyWebpackPlugin([
            path.join(__dirname, '..', 'src', 'assets'),
        ]),
    ],

    node: {
        __dirname: false,
        __filename: false
    }
});
