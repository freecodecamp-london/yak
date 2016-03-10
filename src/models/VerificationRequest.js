import mongoose, { Schema } from 'mongoose';

/**
 * ^ - start of string
 * \s* - whitespace character zero or more
 * (?:\+?(\d{1,3}))? - optional non-capture group
 * 		\+? - optional literal +
 * 		(\d{1,3}) - capture group of 1 - 3 number characters
 * ([-. (]*(\d{3})[-. )]*)? - optional capture group
 * 		[-. (]* - zero or more, one from the set of - or . or 'space' or (
 *   	(\d{3}) - capture group of 3 number characters
 *   	[-. )]* - zero or more, one from the set of - or . or 'space' or )
 * ((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?) - capture group
 * 		(\d{3}) - capture group of 3 number characters
 * 		[-. ]* - zero or more, one from the set of - or . or 'space'
 * 		(\d{2,4}) - capture group of 2-4 number characters
 * 		(?:[-.x ]*(\d+))? - non-capture group
 *   			[-.x ]* - zero or more, one from the set of - or . or x or 'space'
 *   			(\d+) - capture group of 1 or more number character
 * \s*$
 * @type {RegExp}
 */
const re = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/g;

const VerificationRequest = new Schema({
	id: String,
	phoneNumber: {
		type: String,
		validate: {
			validator: function validator(value) {
				return re.test(value);
			},
			message: '{VALUE} is not a valid phone number.',
		},
	},
});

export default mongoose.model('VerificationRequest', VerificationRequest);
