const path = require('path');
const webpack = require('webpack');
console.log(JSON.stringify([process.env.NODE_ENV, process.env.HOT], null, 2));
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
