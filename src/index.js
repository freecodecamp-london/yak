import express from 'express';
import https from 'https';
import config from './config';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
const compiler = webpack(webpackConfig);
const webpackOptions = {
	publicPath: webpackConfig.output.publicPath,
	quiet: false,
	// hides all the bundling file names
	noInfo: true,
	// adds color to the terminal
	stats: {
		colors: true,
	},
};

const env = process.env.NODE_ENV;
const port = process.env.PORT;
const app = express();
let server = null;

if (env === 'development') {
	config.dev.logging(app);
	// add webpack middleware
	// remember config file
	app.use(webpackMiddleware(compiler, webpackOptions));
	app.use(webpackHotMiddleware(compiler));
	// development route
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, './app/index.html'));
	});
} else if (env === 'production') {
	config.prod.logging(app);
}

function handleError(err) {
	console.error(err);
	process.exit(1);
}


// Sample route
app.use('/api', (req, res) => {
	res.json({
		message: 'o hai!',
	});
});
// serve the static file
app.use(express.static(path.join(__dirname, '../build')));

// Won't run the server in test mode
if (~['test', 'development'].indexOf(env)) {
	server = https.createServer(config.dev.https, app);

	// Listen in development only
	if (env === 'development') {
		server.listen(port, (err) => {
			if (err) {
				handleError(err);
			}

			console.log(` 🌎  Live @ https://localhost.daplie.com:${port}`);
		});
	}
} else if (env === 'production') {
	// In production we'll either update this with real https credentials, or
	// offload TLS to the load balancer to lay off the api servers.
	app.listen(port, (err) => {
		if (err) {
			handleError(err);
		}

		console.log(` 🌎  Live on port ${port}`);
	});
}

export default app;
