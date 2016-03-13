import expect from 'expect';
import request from 'supertest';
import app from '../../src/index.js';
import mongoose from 'mongoose';
import User from '../../src/server/models/User.js';


describe('Creating user express route', () => {
	beforeEach(() => {
		User.remove({}).then(() => console.log('Dropped Users Collection'));
	});

	describe('Connection to DB', () => {
		it('should connect successfully', (done) => {
			expect(mongoose.connection.name).toEqual('yak-test');
			done();
		});
	});

	describe('Route itself', () => {
		it('should return a 201 and create a basic user, with only the required fields', (done) => {
			const data = {
				name: {
					first: 'Sean',
					last: 'Campbell',
				},
				email: 'sean@gamil.com',
				username: 'natac',
			};

			request(app)
				.post('/api/v1/user')
				.send(data)
				.expect(201)
				.end(function end(err, res) {
					if (err) {
						done(err);
					}
					expect(err).toEqual(null);
					expect(res.body.success).toEqual(true);
					expect(typeof res.body.user).toEqual('object');
					expect(res.body.user.name.first).toEqual(data.name.first);
					expect(res.body.user.name.last).toEqual(data.name.last);
					expect(res.body.user.email).toEqual(data.email);
					expect(res.body.user.username).toEqual(data.username);
					done();
				});
		});

		it('should return a 409 status if the new user is already in the database', (done) => {
			const data = {
				name: {
					first: 'Sean',
					last: 'Campbell',
				},
				email: 'sean@gamil.com',
				username: 'natac',
			};
			// create already existing user
			User.create(data)
				.then(function fulfilled() {
					request(app)
						.post('/api/v1/user')
						.send(data)
						.expect(409)
						.end(function end(err, res) {
							if (err) {
								done(err);
							}
							expect(res.body.success).toEqual(false);
							expect(res.body.message)
								.toEqual('A user with that email already exists. Please try logging in, or a new email');
							done();
						});
				});
		});
	});

});
