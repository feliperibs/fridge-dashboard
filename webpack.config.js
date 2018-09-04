var devConfig = require('./webpack/webpack.dev.js');
var prodConfig = require('./webpack/webpack.prod.js');
var config;
switch (process.env.npm_lifecycle_event) {
 case 'start':
   config = devConfig;
   break;
 case 'build':
   config = prodConfig;
   break;
 default:
   config = devConfig;
   break;
}
module.exports = config;