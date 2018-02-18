const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config= require('./webpack.config');

config.module = {
	rules: [
		{
			test: /\.tsx?$/,
			loader: [
				'awesome-typescript-loader',
			],
		}, {
			test: /\.css/,
			loader: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&localIdentName=[hash:base64:3]!postcss-loader')
		}, {
			test: /\.png$/,
			loader: "url-loader?limit=10000000"
		}
	]
};

config.plugins = [
	new HtmlPlugin({
		template: path.resolve(__dirname, 'application', 'index.html'),
		filename: path.resolve(__dirname, './dist', 'index.html')
	}),
	new ExtractTextPlugin(path.join('css', '[name].css')),
	new UglifyJsPlugin(),
	new OptimizeCssAssetsPlugin({
		cssProcessor: require('cssnano'),
		cssProcessorOptions: { discardComments: {removeAll: true } },
		canPrint: true
	}),
	new BundleAnalyzerPlugin(),
];

module.exports = config;
