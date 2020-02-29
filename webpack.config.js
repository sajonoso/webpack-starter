const path = require('path')
// const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development', // default mode is development
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
        test: /\.(txt)$/i,
        exclude: /(node_modules)/,
        use: 'raw-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.mjs', '.js'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    }
  },
  plugins: [
    new CopyWebpackPlugin([ { from: 'static' } ]),
  ],
  target: 'web',
  node: {
    __dirname: true,
  },
}