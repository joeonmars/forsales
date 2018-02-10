const path = require('path');
const chalk = require('chalk');


console.log(chalk.blueBright.bold('Running development...'));


import { createConfig, platform } from './webpack.config.babel';

// Example UAs
// 'Mozilla/5.0 (Linux; Android 4.2.2; AFTB Build/JDQ39) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.173 Mobile Safari/537.22 cordova-amazon-fireos/3.4.0 AmazonWebAppPlatform/3.4.0;2.0'

const config = createConfig('dev', {
	'SEGMENT_WRITE_KEY': JSON.stringify('Qp2sM9PQSi75PgLBs0XimnRhUO2O6ric'),
	'STORAGE_KEY': JSON.stringify('rtv_amzn_dev'),
	'ASSETS_ENDPOINT': JSON.stringify('/roku/rokufiles?type=json'),
	'USER_AGENT': JSON.stringify(undefined),
	'DEBUG_MENU': JSON.stringify(true),
});

Object.assign(config, {
	devServer: {
		disableHostCheck: true,
		host: '0.0.0.0',
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		proxy: {
			'/user/**': {
				target: 'http://localhost:4200/',
				secure: false,
			}
		},
	},
});

/*
config.module.rules.push({ 
	test: /\.(png|jpg|gif)$/,
	use: 'file-loader?name=images/[hash].[ext]'
});
*/

config.module.rules.push({ 
	test: /\.(png|jpg|gif)$/,
	use: 'url-loader'
});

config.module.rules.push({
	test: /\.scss$/,
	use: [
		'classnames-loader',
		'style-loader',
		'css-loader?modules=1&sourceMap&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
		'postcss-loader',
		`sass-loader?outputStyle=expanded&includePaths[]=${path.resolve(__dirname, './node_modules/compass-mixins/lib')}`,
	]
});

export default config;
