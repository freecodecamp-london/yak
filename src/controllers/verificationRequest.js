import InvalidNumberError from '../customErrors/InvalidNumber';
import sms from '../lib/sms';
import VerificationRequest from '../models/VerificationRequest';

function createVerificationController(sms) {
	return function getHandler(req, res, next) {
		const { number } = req.params;

		// check for valid input number by coercing to a number
		if (Number.isNaN(+number)) {
			const error = InvalidNumberError('The number entered is not a valid phone number');
			return next(error);
		}
		console.log(VerificationRequest.prototype)
		console.log(VerificationRequest.prototype.hasOwnProperty('findOne'))
		// using sms library that calls a third-party application
		sms.verificationRequestSend(number)
			// .then(function fulfilled(result) {
			// 	const conditions = { phoneNumber: result.phoneNumber };
			// 	const options = { upsert: true };
			// 	// console.log(Object.keys(VerificationRequest))
			// 	VerificationRequest.findOneAndUpdate(conditions, result, options)
			// 		.exec();
			// })
			.then(function fulfilled(result) {
				res.json({})
			})
			// more promise stuff
			.catch(function catchHandler(error) {
				return next(error);
			});
	};
}

const verificationController = createVerificationController(sms);
export default verificationController;
