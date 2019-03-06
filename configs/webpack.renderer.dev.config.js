const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.common.config.js');
const spawn = require('child_process').spawn;
const webpack = require('webpack');

const port = process.env.PORT || 1212;
const publicPath = `http://localhost:${port}/dist`;

module.exports = merge.smart(baseConfig, {
    devtool: 'inline-source-map',
    mode: 'development',
    target: 'electron-renderer',

    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${port}/`,
        'webpack/hot/only-dev-server',
        path.join(__dirname, '..', 'src', 'main'),
    ],

    output: {
        publicPath,
        filename: 'renderer.dev.js'
    },

    module: {
        rules: [
            {
                test: /\.(s?css|)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),
    ],

    node: {
        __dirname: false,
        __filename: false
    },

    devServer: {
        port,
        publicPath,
        compress: true,
        noInfo: true,
        stats: 'errors-only',
        inline: true,
        lazy: false,
        hot: true,
        headers: {'Access-Control-Allow-Origin': '*'},
        contentBase: path.join(__dirname, 'dist'),
        watchOptions: {
            aggregateTimeout: 300,
            ignored: /node_modules/,
            poll: 100
        },
        historyApiFallback: {
            verbose: true,
            disableDotRule: false
        },
        before() {
            if (process.env.START_HOT) {
                console.log('Starting Main Process...');
                spawn('npm', ['run', 'start-main-dev'], {
                    shell: true,
                    env: process.env,
                    stdio: 'inherit'
                })
                    .on('close', code => process.exit(code))
                    .on('error', spawnError => console.error(spawnError));
            }
        }
    }
});
