const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    entry: './src/modus-js-bridge.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '_do_not_use_.js'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./src", to: "./example" },
                { from: "./src/modus-js-bridge.js", to: "./" },
            ],
        }),
    ],
    watch: false,
    devServer: {
        //contentBase: './dist/example',
        contentBase: './src'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                terserOptions: {
                    format: {
                        comments: /@* eslint/i,
                    },
                },
                extractComments: false,
            }),
        ],
    },
};