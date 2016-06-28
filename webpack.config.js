'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const prod = process.env.NODE_ENV === 'production';
const entry = './src/app.js';
const devEntry = [
  'webpack/hot/dev-server',
  'webpack-hot-middleware/client?reload=true',
  entry,
];

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    prod,
    inject: false,
    minify: prod ? {
      removeComments: true,
      collapseWhitespace: true
    } : false,
  })
];

plugins = prod ? plugins.concat([
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
]) : plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
]);

module.exports = {
  debug: !prod,
  devtool: !prod ? '#eval' : null,

  entry: prod ? entry : devEntry,

  output: {
    path: path.join(__dirname, 'dist'),
    filename: `bundle.[hash:7].js`,
    // publicPath: './'
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ]
      },
      {
        test: /.less$/,
        loaders: [
          'style',
          'css?minimize',
          'less'
        ],
        include: [
          path.resolve(__dirname, 'src'),
        ]
      }
    ]
  },

  plugins: plugins,
};

