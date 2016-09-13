'use strict'

exports = module.exports = {
	devServer: require('./dev-server.js'),
	setupCSS: require('./setup-css.js'),
	minify: require('./minify.js'),
	setFreeVariable: require('./set-free-variable.js'),
	extractBundle: require('./extract-bundle.js'),
	clean: require('./clean.js'),
	extractCSS: require('./extract-css.js'),
	purifyCSS: require('./purify-css.js'),
}