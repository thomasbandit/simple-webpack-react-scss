const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const WebpackAssetsManifest = require('webpack-assets-manifest');

const config = {
  mode: 'production',
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
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve('./dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
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
        use: [
          'babel-loader',
          // 'eslint-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test:  /\.svg$/,
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
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      // we specify a custom UglifyJsPlugin here to get source maps in production
      // new UglifyJsPlugin({
      //   cache: true,
      //   parallel: true,
      //   uglifyOptions: {
      //     compress: false,
      //     ecma: 5,
      //     mangle: true
      //   },
      //   sourceMap: true
      // })
    ],
    // splitChunks: {
    //   cacheGroups: {
    //     styles: {
    //       name: 'styles',
    //       test: /\.scss$/,
    //       chunks: 'all',
    //       enforce: true
    //     }
    //   }
    // }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      },
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: 'src/assets/img',
    //     to:'static/img'
    //   }
    // ]),
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
