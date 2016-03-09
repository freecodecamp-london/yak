import InvalidNumberError from '../customErrors/InvalidNumber';
import sms from '../lib/sms';

function createVerificationController(sms) {
	return function getHandler(req, res, next) {
		const { number } = req.params;

		// check for valid input number by coercing to a number
		if (Number.isNaN(+number)) {
			const error = InvalidNumberError('The number entered is not a valid phone number');
			return next(error);
		}

		// using sms library that calls a third-party application
		sms.verificationRequestSend(number)
			.then(function fulfilled(result) {
				res.json(result);
			})
			// more promise stuff
			.catch(function catchHandler(error) {
				return next(error);
			});
	};
}

const verificationController = createVerificationController(sms);
export default verificationController;
