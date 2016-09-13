'use strict'

const webpack = require('webpack')

exports = module.exports = function minify() {
	return {
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
				},
				mangle: {
					except: ['webpackJsonp'],
					screw_ie8: true,
				}
			})
		]
	}
}