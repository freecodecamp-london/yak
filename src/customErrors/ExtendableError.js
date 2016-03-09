// there is a library on Github to handle this exactly
class ExtendableError extends Error {
	constructor(message = '') {
		super(message);
		this.name = this.constructor.name;
		this.message = message;
		Error.captureStackTrace(this, this.constructor);
	}
}

export default ExtendableError;
