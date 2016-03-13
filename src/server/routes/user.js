import express from 'express';
import User from '../models/User';

const router = express.Router();

function badResponse(message) {
	return {
		success: false,
		messages: [message],
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
			// no need for these fields
			const projection = { _id: false, __v: false };
			// look for existing user
			const originalUser = await User.findOne({ email }, projection);
			if (originalUser) {
				res.status(409)
					.json(badResponse('A user with that email already exists. Please try logging in, or a new email'));
				next();
			} else {
				try {
					// create new user when no previous user exists
					const user = await User.create(req.body);
					res.status(201).json(successResponse(user));
					next();
				} catch (error) {
					// handle missing fields
					next(error);
				}
			}
		} catch (error) {
			next(error);
		}


	});

export default router;
