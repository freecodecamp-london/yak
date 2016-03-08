import path from 'path';
import morgan from 'morgan';
import fs from 'fs';
// Used to rotate logs daily
import FileStreamRotator from 'file-stream-rotator';

const logDirectory = path.join(__dirname, '../../logs');

function logging(app) {
	// Ensure log directory exists
	fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

	// Log stream
	const errorLogStream = FileStreamRotator.getStream({
		/* eslint-disable camelcase */
		date_format: 'YYYYMMDD',
		/* eslint-enable camelcase */
		filename: path.join(logDirectory, 'access-%DATE%.log'),
		frequency: 'daily',
		verbose: false,
	});

	app.use(morgan('common', { stream: errorLogStream }));
}

export default { logging };
