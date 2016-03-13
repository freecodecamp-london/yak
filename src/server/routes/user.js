import express from 'express';
import User from '../models/User';

const router = express.Router();

function badResponse(message) {
	return {
		success: false,
		message,
	};
}

function successResponse(user) {
	return {
		success: true,
		user,
	};
}
router.route('/v1/user')
	.post(async function postMiddleware(req, res, next) {
		const { email } = req.body;
		try {
			const projection = { _id: false, __v: false };
			if (await User.findOne({ email }, projection)) {
				res.status(409)
					.json(badResponse('A user with that email already exists. Please try logging in, or a new email'));
			}
		} catch (error) {
			next(error);
		}

		try {
			const user = await User.create(req.body);
			res.status(201).json(successResponse(user));
		} catch (error) {
			next(error);
		}
	});

export default router;
