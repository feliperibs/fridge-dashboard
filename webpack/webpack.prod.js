var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = webpackMerge(commonConfig, {

  plugins: [
    new UglifyJSPlugin()
  ]
});