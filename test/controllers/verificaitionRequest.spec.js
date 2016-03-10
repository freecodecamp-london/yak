import request from 'supertest';
import expect from 'expect';
import app from '../../src/index';
import Promise from 'bluebird';
import InvalidNumber from '../../src/customErrors/InvalidNumber';

import sms from '../../src/lib/sms';
import VerificationRequest from '../../src/models/VerificationRequest';

const validNumberPath = '/verify/+15551234567';
describe('Verification Request endpoints', () => {
	afterEach(() => {
		expect.restoreSpies();
	});

	it('should call the verificationRequest function when given a proper number', (done) => {
		const spy = expect.spyOn(sms, 'verificationRequestSend')
			.andReturn(Promise.resolve());

		request(app)
			.get(validNumberPath)
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err) => {
				expect(spy.calls.length).toEqual(1);
				done(err);
			});
	});

	it('should not send the verificationRequest when an invalid number is used.', (done) => {
		const spy = expect.spyOn(sms, 'verificationRequestSend')
			.andReturn(Promise.reject(InvalidNumber())); // not sure how to get this handled

		request(app)
			.get('/verify/+notaNumber')
			.expect(500)
			.end((err) => {
				expect(spy).toNotHaveBeenCalled();
				done(err);
			});
	});

	it('should call a findOne method of the verificationRequest Model', (done) => {
		const spy = expect.spyOn(VerificationRequest.prototype, 'findOneAndUpdate')
			.andReturn(Promise.resolve());

		request(app)
			.get(validNumberPath)
			.expect(200)
			.end((err) => {
				expect(spy.calls.length).toEqual(1);
				done(err);
			});
	});

	// it('should call the save method on the query returned from the call to findOneAndUpdate', (done) => {
	// 	const spy = expect.spyOn(VerificationRequest, 'save')
	// 		.andReturn(Promise.resolve());
	// 	const secondarySpy = expect.spyOn(VerificationRequest, 'findOneAndUpdate')
	// 		.andReturn(Promise.resolve());

	// 	request(app)
	// 		.get(validNumberPath)
	// 		.expect(200)
	// 		.end((err) => {
	// 			expect(secondarySpy.calls.length).toEqual(1);
	// 			expect(spy.calls.length).toEqual(1);
	// 			done(err);
	// 		});
	// });
});
