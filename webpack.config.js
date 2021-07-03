const webpack = require('webpack');

module.exports = {
  entry: {
    badge: './src/badge.ts',
    content: './src/content.ts',
    playlist: './src/playlist.ts',
    popup: './src/popup.tsx'
  },
  output: {
    path: __dirname + '/dist/js',
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
        use: [
          { loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=../fonts/[hash].[ext]' }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          { loader: 'file-loader?name=../fonts/[hash].[ext]' }
        ]
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      { test: /\.tsx?$/, use: 'ts-loader' },
      { enforce: 'pre', test: /\.js$/, use: 'source-map-loader' }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}
