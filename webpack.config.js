'use strict';

var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

function join(dest) { return path.resolve(__dirname, dest); }

function web(dest) { return join('web/static/' + dest); }

var config = module.exports = {
  entry: {
    application: [
      web('css/app.scss'),
      web('js/app.js'),
    ],
  },

  output: {
    path: join('priv/static'),
    filename: 'js/application.js',
  },

  resolve: {
    extensions: ['', '.js', '.scss'],
    modulesDirectories: ['node_modules'],
  },

  module: {
    noParse: /vendor\/phoenix/,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy', 'transform-class-properties', 'transform-object-rest-spread'],
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?indentedSyntax&includePaths[]=' + __dirname +  '/node_modules')
      },
    ],
  },
  postcss: function() {
    return [autoprefixer]
  },
  plugins: [
    new ExtractTextPlugin('css/application.css')
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  );
}