'use strict'

exports = module.exports = function setupCSS(paths) {
	return {
		module: {
			loaders: [{
				test: /\.css$/,
				loaders: ['style', 'css'],
				include: paths,
			}]
		}
	}
}