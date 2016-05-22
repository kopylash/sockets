var webpack = require('webpack');
var path = require("path");
var app = path.join(__dirname, "app");

module.exports = {
  context: app,
  entry: ['./index.jsx'],

  output: {
    path: __dirname + '/assets',
    filename: 'bundle.web.js'
  },

  resolve: {
    root: [app],
    extensions: ['', '.jsx', '.js']
  },

  module: {
    loaders: [
      // support es6 harmony for jsx and js
      {test: /\.jsx?$/, loaders: ['jsx?harmony', 'babel-loader'], exclude: /(node_modules|bower_components)/},
      // used for i18n
      {test: /\.json$/, loader: "json"}
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.DefinePlugin({
      __SOCKET_URL__: process.env.SOCKET_URL
    }),
    // fixes problem with safe write mode in some IDEs, checks file stats
    new webpack.OldWatchingPlugin()
  ]

};
