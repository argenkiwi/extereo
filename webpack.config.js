const webpack = require('webpack');

module.exports = {
  entry: {
    badge: './src/badge.ts',
    content: './src/content.ts',
    popup: './src/popup.tsx'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=../fonts/[hash].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=../fonts/[hash].[ext]'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}
