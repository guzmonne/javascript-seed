'use strict'

const PurifyCSSPlugin = require('purifycss-webpack-plugin')

exports = module.exports = function purifyCSS(paths) {
	return {
		plugins: [
			new PurifyCSSPlugin({
				basePath: process.cwd(),
				// 'paths' is used to point PurifyCSS to files not
				// visible to Webpack. You can pass glob patterns
				// to it.
				paths: paths,
				purifyOptions: {
					info: true,
				}
			})
		]
	}
}
