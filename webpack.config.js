/* global __dirname, require, module */

const webpack = require('webpack')
const path = require('path')
const env = require('yargs').argv.env // use --env with webpack 2
const pkg = require('./package.json')

let libraryName = pkg.name

let outputFile, mode, plugins

if (env === 'build') {
  plugins = [
    new webpack.BannerPlugin({
      banner: (pkg.name + ' v' + pkg.version + ' published at ' + new Date().toLocaleString())
    })
  ]
  mode = 'production'
  outputFile = libraryName + '.min.js'
} else {
  mode = 'development'
  outputFile = libraryName + '.js'
}

const config = {
  mode: mode,
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  plugins: plugins,
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  }
}

module.exports = config
