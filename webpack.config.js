const webpack = require('webpack');
const path = require('path');

const BUILD_PATH = path.join(__dirname, 'build');
const ENTRY_FILE = path.join(__dirname, 'app', 'index.js');
const LOCALHOST = 'https://localhost.daplie.com:3000';

module.exports = {
	context: __dirname,
	devtool: 'eval',
	entry: [
		'babel-polyfill', // This are a bunch of proxies of functions from ES2015
		'webpack/hot/only-dev-server', // These 2 are required for hot module reload
		`webpack-hot-middleware/client?${LOCALHOST}`,
		ENTRY_FILE,
	],
	output: {
		publicPath: LOCALHOST, // also required for HMR
		path: BUILD_PATH,
		filename: 'bundle.js',
	},
	resolve: {
		extensions: [
			'',
			'.js', // So you can write import myComponent from './myComponent'
			'.jsx', // dropping the .js or .jsx
		],
	},
	module: {
		loaders: [
			{
				test: /\.jsx?/,
				loader: 'babel',
				query: {
					cacheDirectory: true,
					presets: ['es2015-node5', 'stage-2', 'react'],
				},
			},
		],
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
			},
		}),
	],
};
