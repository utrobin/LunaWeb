const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const packageJson = require('./package.json');

const url = '/';

module.exports = {
	entry: [
		'./application/index.tsx',
	],

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: path.join('js', '[name].bundle.js'),
		chunkFilename: '[id].bundle.[hash].js',
		publicPath: url,
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: [
					'awesome-typescript-loader',
				],
			}, {
				test: /\.svg$/,
				loader: 'svg-inline-loader'
			}, {
				test: /\.css/,
				loader: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
			},
		]
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},

	plugins: [
		new HtmlPlugin({
			template: path.resolve(__dirname, 'application', 'index.html'),
			filename: path.resolve(__dirname, './dist', 'index.html')
		}),
		new ExtractTextPlugin(path.join('css', '[name].css')),
	],

	devtool: 'inline-source-map',

	devServer: {
		contentBase: path.join(__dirname, './dist'),
		historyApiFallback: true,
		compress: true,
		port: 2017,
	}
};
