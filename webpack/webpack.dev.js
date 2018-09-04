var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
    devServer: {
        host: '127.0.0.1',
        port: 4200,
        "proxy": {},
    }
});
