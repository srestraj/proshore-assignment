'use strict'
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv').config({ path: __dirname + '../.env' })

module.exports = {
    mode: 'development',
    devServer: {
      historyApiFallback: true
    },
    entry: [
      './src/app.js'
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new webpack.DefinePlugin({
          'process.env': JSON.stringify(dotenv.parsed),
        }),
    ]
}