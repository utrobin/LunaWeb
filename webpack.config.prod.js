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
			test: /\.svg$/,
			loader: 'svg-inline-loader'
		}
	]
};

config.plugins = [
	new HtmlPlugin({
		template: path.resolve(__dirname, 'application', 'index.html'),
		filename: path.resolve(__dirname, './dist', 'index.html')
	}),
	new UglifyJsPlugin(),
];

module.exports = config;
