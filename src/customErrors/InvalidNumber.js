class InvalidNumberError extends Error {
	constructor(message = '', callingContext) {
		super(message);
		this.name = 'InvalidNumberError';
		this.message = message;

		// Create stack trace and remove the InvalidNumberError class and the
		// function which creates it
		Error.captureStackTrace(this, (callingContext || this.constructor));
	}

}

// could pass in a setting option object if there needs to be more details on
// the error.
// I keep reading about not using class in JS therefore this will remove the
// need for the 'new' keyword for function constructors.
function createInvalidNumberError(message) {
	return new InvalidNumberError(message, InvalidNumberError);
}

export default createInvalidNumberError;
