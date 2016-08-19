var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

var config = {
  devtool: 'source-map',
  entry: './src/index',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        loaders: ['babel'],
        include: path.resolve(__dirname, '../src')
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('css!sass'),
        include: path.resolve(__dirname, '../src/scss')
      }
    ]
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('style.css', {
      allChunks: true
    })
  ]
};

module.exports = config;
