const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: './src/modus-js-bridge.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'modus-js-bridge.js'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./src", to: "./example" }],
        }),
    ],
    watch: false,
    devServer: {
        //contentBase: './dist/example',
        contentBase: './src'
    },
};