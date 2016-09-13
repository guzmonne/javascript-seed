'use strict'

const webpack = require('webpack')

exports = module.exports = function setFreeVariable(key, value) {
	const env = {}
	env[key] = JSON.stringify(value)
	return {
		plugins: [
			new webpack.DefinePlugin(env),
		]
	}
}