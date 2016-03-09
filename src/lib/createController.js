export default function createController(verify) {
	return function getHandler(req, res) {
		const { number } = req.params;
		const promise = verify.send(number);

		return promise.then(
		function fulfilled(result) {
			res.status(200);
			res.type('json');
			res.json(result);
		},
		function rejected(err) {
			const error = {
				message: 'Error sending the verification request to third party',
				_error: err,
			};
			res.status(500);
			res.json(error);
		});

	};
}
