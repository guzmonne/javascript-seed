'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports = module.exports = function extractCSS(paths) {
	return {
		module: {
			loaders: [{
				// Extracts CSS during build
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css'),
				include: paths,
			}]
		},
		plugins: [
			// Output extracted CSS to a file
			new ExtractTextPlugin('[name].[chunkhash].css'),
		]
	}
}