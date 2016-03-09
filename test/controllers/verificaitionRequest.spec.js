import request from 'supertest';
import expect from 'expect';
import app from '../../src/index';
import Promise from 'bluebird';
import InvalidNumber from '../../src/customErrors/InvalidNumber';

import sms from '../../src/lib/sms';

describe('Verification Request endpoints, to ping an API which sends the code to user', () => {
	afterEach(() => {
		expect.restoreSpies();
	});

	it('should call the verificationRequest function when given a proper number', (done) => {
		const spy = expect.spyOn(sms, 'verificationRequestSend')
			.andReturn(Promise.resolve());

		request(app)
			.get('/verify/+15551234567')
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
});
