var path = require('path');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');

var config = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        loaders: ['react-hot', 'babel'],
        include: path.resolve(__dirname, '../src')
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style',
          'css?sourceMap',
          'autoprefixer?browsers=last 2 version',
          'sass?outputStyle=expanded&sourceMap'
        ]
      }
    ]
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
