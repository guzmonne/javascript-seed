'use strict'

const CleanWebpackPlugin = require('clean-webpack-plugin')

exports = module.exports = function clean(path) {
	return {
		plugins: [
			new CleanWebpackPlugin([path], {
				// Without 'root' CleanWebpackPlugin won't point to our
				// project and will fail to work.
				root: process.cwd(),
			})
		]
	}
}