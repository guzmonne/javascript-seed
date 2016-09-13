'use strict';

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const validate = require('webpack-validator')

const parts = require('./libs/parts/')
const pkg = require('./package.json')

const vendor = Object.keys(pkg.dependencies)
  .filter(function(dep){ return ['purecss'].indexOf(dep) === -1 })

/**
 * Supported development source-maps options:
 * 'eval', 
 * 'cheap-eval-source-map',
 * 'cheap-module-eval-source-map',
 * 'eval-source-map'
 *
 * Supported production source-maps options:
 * 'cheap-source-maps',
 * 'cheap-module-source-map',
 * 'source-map'
 */

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
  'build:gh': path.join(__dirname, 'gh'),
  style: [
    path.join(__dirname, 'src', 'styles', 'index.css'),
    path.join(__dirname, 'node_modules', 'purecss'),
  ],
}

const common = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter from given it's
  // convenient with more complex configurations.
  entry: {
    app: PATHS.app,
    style: PATHS.style,
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Javascript Seed',
    })
  ]
}

let config;

// Detect how npm is run and branch based on that
const branch = process.env.npm_lifecycle_event

switch(branch){
  case 'stats':
  case 'build:gh':
  case 'build':
    config = merge(
      common,
      { 
        // Enable separated source-maps
        devtool: 'source-map',
        output: {
          path: PATHS[branch],
          filename: '[name].[chunkhash].js',
          // Tweak this to match your GitHub project name
          publicPath: branch === 'build:gh' ? '/javascript-seed/' : '/',
          // This is used for require.ensure. The setup
          // will work without but this is useful to set.
          chunkFilename: '[chunkhash].js',
        },
        plugins: [
          new webpack.optimize.DedupePlugin(),
        ]
      },
      parts.extractCSS(PATHS.style),
      // It is important that purifyCSS is run after extractCSS.
      parts.purifyCSS([PATHS.app]),
      parts.minify(),
      parts.setFreeVariable('process.env.NODE_ENV', 'production'),
      parts.extractBundle({
        name: 'vendor',
        entries: vendor,
      }),
      parts.clean(PATHS[branch])
    )
    break
  default:
    config = merge(
      common,
      parts.devServer({
        // Customize host/port here if needed.
        host: process.env.HOST,
        port: process.env.PORT,
      }),
      parts.setupCSS(PATHS.style),
      // Enable inline source-maps
      { devtool: 'eval-source-map' }
    )

}

// Run validator in quite mode to avoid output in stats
exports = module.exports = validate(config, {quiet: true})
