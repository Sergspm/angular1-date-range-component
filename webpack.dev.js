const path = require('path');
const webpack = require("webpack");
const libPath = path.join(__dirname, 'client');
const wwwPath = path.join(__dirname, 'dist');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: path.join(libPath, '/app/app.module.ts'),
	output: {
		path: path.join(wwwPath),
		filename: 'bundle.js'
	},
	devServer: {
		outputPath: path.join(wwwPath)
	},
	resolve: {
		root: [path.join(libPath)],
		extensions: ['', '.js', '.jsx', '.ts', '.tsx']
	},
	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: 'babel!ts-loader',
				exclude: /node_modules/,
			}, {
				test: /\.ts$/,
				enforce: 'pre',
				loader: 'tslint-loader',
				options: {}
			}, {
				test: /\.html$/,
				loader: 'html-loader?exportAsEs6Default'
			}, {
				test: /\.(png|jpg)$/,
				loader: 'file?name=img/[name].[ext]' // inline base64 URLs for <=10kb images, direct URLs for the rest
			},{
				test: /\.scss$/,
				loader: 'style!css!sass'
			}, {
				test: /\.css$/,
				loader: 'style!css'
			}, {
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: "ng-annotate?add=true!babel"
			}, {
				test: [
					/fontawesome-webfont\.svg/,
					/fontawesome-webfont\.eot/,
					/fontawesome-webfont\.ttf/,
					/fontawesome-webfont\.woff/,
					/fontawesome-webfont\.woff2/
				],
				loader: 'file?name=fonts/[name].[ext]'
			},
			{
				test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
				loader: 'url'
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			'window.Masonry': 'Masonry'
		}),

		// HtmlWebpackPlugin: Simplifies creation of HTML files to serve your webpack bundles : https://www.npmjs.com/package/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'index.html',
			pkg: pkg,
			template: path.join(libPath, 'index.ejs'),
			inject: true
		}),

		// OccurenceOrderPlugin: Assign the module and chunk ids by occurrence count. : https://webpack.github.io/docs/list-of-plugins.html#occurenceorderplugin
		new webpack.optimize.OccurenceOrderPlugin(),

		// Deduplication: find duplicate dependencies & prevents duplicate inclusion : https://github.com/webpack/docs/wiki/optimization#deduplication
		new webpack.optimize.DedupePlugin(),

		new CopyWebpackPlugin([
			{
				from: path.join(libPath, '/app/templates'),
				to: path.join(wwwPath, 'templates')
			}
		])
	]
};