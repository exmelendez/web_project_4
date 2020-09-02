const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './scripts/index.js'
    },
    output: {
        filename: 'main.js',
        "path": path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: "/node_modules/"
            },
            {
                test: /\.css$/,
                loader: [MiniCssExtractPlugin.loader,
                { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader']
            },
            {
                test: /\.(woff|woff2|svg|png|jpg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new MiniCssExtractPlugin()
    ]
}