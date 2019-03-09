const path = require('path');
const webpack = require('webpack');

module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json']
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV', 'PORT', 'HOT']),
    ]
};
