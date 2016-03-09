import request from 'supertest';
import expect from 'expect';
import app from '../../src/index.js';

import createController from '../../src/lib/createController.js';

import verify from '../../src/lib/verify.js';
// const verify = {
// 	send(number) {
// 		const verifyData = {
// 		  identity: {
//   			type: 'number',
//     		endpoint: number
//   		},
//   		method: 'sms'
// 		};
// 		sinchApi.verification.verificationRequest(verifyData)
// 	},
//  ...
// }

describe('Verification Request endpoints, to ping an API which sends the code to user', () => {
	let verifyController;
	beforeEach(() => {
		verifyController = createController(verify);
	});

	it('should call the send function when given a proper number', (done) => {
		const spy = expect.spyOn(verify, 'send').andCall(() => {});
		app.use('/verify/:number', verifyController);
		request(app)
			.get('/verify/+15551234567')
			.expect('Content-Type', 'json')
			.expect(200);
			// const verifyData = {
			// 	identity: {
			// 		type: 'number',
			// 		endpoint: '+15551234567'
			// 	},
			// 	method: 'sms'
			// };
		// expect(spy.calls).toHaveBeenCalledWith(verifyData);
		expect(spy).toHaveBeenCalled();
		done();
	});

	it('should send a 400 code when an invalid number is used.', () => {
		const spy = expect.spyOn(verify, 'send').andCall(() => {});
		app.use('/verify/:number', verifyController);
		request(app)
			.get('/verify/+notaNumber')
			.expect(400);
		expect(spy).toNotHaveBeenCalled();

	});
});
