const path = require('path');
const chalk = require('chalk');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const version = require('./package.json').version;

const should_analyze = (process.env.ANALYZE === 'true');

console.log(chalk.greenBright.bold('Building production...'));


import { createConfig, platform } from './webpack.config.babel';

const config = createConfig('prod', {
	'SEGMENT_WRITE_KEY': JSON.stringify('PwxaeJzxSuSl6Dx90IqeqhoQcCFgUYiz'),
	'STORAGE_KEY': JSON.stringify('rtv_amzn_prod'),
	'ASSETS_ENDPOINT': JSON.stringify('https://www.reuters.tv/roku/rokufiles?type=json'),
	'USER_AGENT':  JSON.stringify(undefined),
	'DEBUG_MENU': JSON.stringify(false),
});

Object.assign(config.output, {
	publicPath: './',
	path: path.join(__dirname, `output/${platform}`),
});

config.module.rules.push({ 
	test: /\.(png|jpg|gif)$/,
	use: 'url-loader'
});

config.module.rules.push({
	test: /\.scss$/,
	use: [
		'classnames-loader',
		...ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: [
				'css-loader?modules=1&sourceMap&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
				'postcss-loader',
				`sass-loader?outputStyle=expanded&includePaths[]=${path.resolve(__dirname, './node_modules/compass-mixins/lib')}`
			]
		}),
	]
});

config.plugins.push(new ExtractTextPlugin({
	filename: 'app.bundle.css',
	allChunks: true,
}));

config.plugins.push(new webpack.optimize.UglifyJsPlugin({
	comments: false,
	compress: {
		warnings: false,
		drop_console: true,
	},
}));

if (should_analyze) {
	config.plugins.push(new BundleAnalyzerPlugin());
}

config.plugins.push(new ZipPlugin({
	filename: `RTV_${platform.toUpperCase()}_${version}.zip`,
}));

const paths_to_clean = [`output/${platform}`];
config.plugins.push(new CleanWebpackPlugin(paths_to_clean));

export default config;
