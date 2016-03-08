import fs from 'fs';
import path from 'path';
import morgan from 'morgan';

// Load the key/cert manually from `serve-https` for some free dev HTTPS!
// URL will be `https://localhost.daplie.com:port`
const httpsKey = path.join(
	__dirname,
	'../../node_modules/localhost.daplie.com-certificates/certs/server/my-server.key.pem'
);

const httpsCert = path.join(
	__dirname,
	'../../node_modules/localhost.daplie.com-certificates/certs/server/my-server.crt.pem'
);

const https = {
	key: fs.readFileSync(httpsKey),
	cert: fs.readFileSync(httpsCert),
};

function logging(app) {
	app.use(morgan('dev'));
}

export default { logging, https };
