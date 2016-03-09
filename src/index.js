import express from 'express';
import https from 'https';
import config from './config';

// route controllers
import verificationRequest from './controllers/verificationRequest';

const env = process.env.NODE_ENV;
const port = process.env.PORT;
const app = express();
let server = null;

if (env === 'development') {
	config.dev.logging(app);
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

// Add Route Controllers
app.use('/verify/:number', verificationRequest);

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
