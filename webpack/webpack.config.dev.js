const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const WebpackAssetsManifest = require('webpack-assets-manifest');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

const config = {
  mode: 'development',
  entry: {
    client: './src/index.js',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'redux',
      'redux-thunk',
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loaders: 'html-loader'
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          'file-loader',
          'image-webpack-loader',
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[hash:base64:5]'
            }
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          '@svgr/webpack',
          'file-loader'
        ],
      },
      // {
      //   test: /\.svg$/,
      //   exclude: /node_modules/,
      //   loader: 'svg-react-loader',
      //   query: {
      //     classIdPrefix: '[name]-[hash:8]__',
      //     xmlnsTest: /^xmlns.*$/
      //   }
      // },
    ]
  },
  output: {
    publicPath: '/'
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 5,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  serve: {
    add: (app, middleware, options) => {
      app.use(convert(history({})));
    },
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/assets/img',
        to:'static/img'
      }
    ]),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new WebpackAssetsManifest({
      // Options go here
    }),
  ]
};

module.exports = config;
