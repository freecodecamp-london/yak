function findMissingFields(required, error) {
	const messageMap = {
		['name.first']: 'You are missing the required first name field',
		['name.last']: 'You are missing the required last name field',
		username: 'You are missing the required username field',
		email: 'You are missing the required email field',
	};
	return required.reduce((acc, field) => {
		if (error[field] && error[field].kind === 'required') {
			acc.messages.push(messageMap[field]);
			return acc;
		}
		return acc;
	}, { success: false, messages: [] });
}


function errorHandler(err, req, res, next) {
	if (err.name === 'ValidationError') {
		const requiredFields = ['name.first', 'name.last', 'username', 'email'];
		const response = findMissingFields(requiredFields, err.errors);
		res.status(200).json(response);
	}
	next();
}

export default errorHandler;
