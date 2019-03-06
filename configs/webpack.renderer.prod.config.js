const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.common.config.js');

module.exports = merge.smart(baseConfig, {
    devtool: 'source-map',
    mode: 'production',
    target: 'electron-renderer',

    entry: path.join(__dirname, '..', 'src', 'main'),

    output: {
        publicPath: './dist/',
        filename: 'renderer.prod.js'
    },

    module: {
        rules: [
            {
                test: /^((?!\.global).)*\.(scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
    ],

});
