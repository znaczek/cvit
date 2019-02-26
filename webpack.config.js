const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
    const mode = argv.mode;

    const config = {
        target: 'electron-main',
        entry: './src/index.ts',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js' ]
        },
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname)
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src', 'index.html'),
                inject: false,
            }),
            new CopyWebpackPlugin([
                path.join(__dirname, 'src', 'assets'),
            ]),
            new webpack.DefinePlugin({
                __PRODUCTION__: mode === 'production',
            }),
        ],
    };

    if (mode === 'production') {
        config.mode = 'production';
    } else {
        config.mode = 'development';
        config.devtool = 'inline-source-map';
    }

    return config;
};
