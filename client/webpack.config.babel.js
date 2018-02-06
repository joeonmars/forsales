const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const platform = process.env.PLATFORM;

// Log server configuration when bootstrapping
console.log(`PLATFORM IS: ${chalk.blueBright(platform.toUpperCase())}`);

const createConfig = (env, global_compile_constants={}) => {

	return {
		entry: {
			[platform]: [
				'core-js/fn/array',
				'core-js/es6/math',
				'core-js/es7/object',
				'./src/js/bootstrap.js',
			],
		},

		output: {
			publicPath: '/',
			path: path.join(__dirname, 'output'),
			filename: 'app.bundle.js',
			sourceMapFilename: 'app.map',
		},

		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: [
						'react-hot-loader',
						'babel-loader',
					]
				},
				{
					test: /\/src\/fonts\/(.*)\.(woff|woff2|eot|ttf|otf)$/,
					use: 'url-loader'
				},
				{
					test: /\/src\/sounds\/(.*)\.(mp3|wav)$/,
					use: 'file-loader?name=sounds/[hash].[ext]'
				},
				{
					test: /\/src\/video\/(.*)\.(mp4)$/,
					use: 'file-loader?name=video/[hash].[ext]'
				},
				{
					test: /\/src\/images\/(.*)\.svg$/,
					use: [
						'babel-loader',
						'svg-to-jsx-loader',
					],
				},
			]
		},

		resolve: {
			modules: [path.resolve(__dirname, 'src'), 'node_modules'],
			extensions: ['.js', '.jsx', '.scss'],
			symlinks: false,
		},

		plugins: [
			new webpack.ProvidePlugin({
				React: 'react',
				ReactDOM: 'react-dom'
			}),

			new webpack.LoaderOptionsPlugin({
				debug: true
			}),

			new webpack.DefinePlugin(Object.assign({
				'process.env.NODE_ENV': JSON.stringify(env),
				'APP_VERSION': JSON.stringify(require('./package.json').version),
				'API_PLATFORM': JSON.stringify('amzn'),
			}, global_compile_constants)),

			new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),

			new HtmlWebpackPlugin({
				inject: true,
				template: './src/html/index.ejs',
				favicon: './src/images/favicon.ico',
				title: 'Reuters TV: Live Breaking News, US, World, Business, Finance',
				filename: 'index.html',
		    }),

			new WebpackPwaManifest({
				'name': 'Reuters TV: Live Breaking News, US, World, Business, Finance',
				'short_name': 'Reuters TV',
				'start_url': '/',
				'background_color': '#fff',
				'theme_color': '#000',
				'display': 'standalone',
				'orientation': 'landscape-primary',
				'description': 'Watch Reuters TV for free, personalized video news on-­the-­go.',
				'icons': [{
					'src': path.resolve(__dirname, 'src/images/web-app-icon.png'),
					'sizes': [96, 128, 192, 256, 384, 512],
					'destination': 'web-app-icons',
				}],
				'related_applications': [{
					'platform': 'web',
					'url': 'https://reuters.tv',
				}],
			}),
		]
	};
};

export {
	createConfig,
	platform,
};

export default createConfig();
