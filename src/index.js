import express from 'express';

const port = process.env.PORT || 3000;
const app = express();

app.use('/api', (req, res) => {
	res.json({
		message: 'o hai!'
	});
});

app.listen(port, err => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log(`listening on port ${port}`);
});
