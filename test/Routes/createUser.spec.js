import expect from 'expect';
import request from 'supertest';
import app from '../../src/index.js';
import mongoose from 'mongoose';
import User from '../../src/server/models/User.js';


describe('Creating user express route', () => {

	describe('Connection to DB', () => {
		it('should connect successfully', (done) => {
			expect(mongoose.connection.name).toEqual('yak-test');
			done();
		});
	});

	describe('Route itself', () => {

		beforeEach(() => {
			User.remove({}).then(() => console.log('Clean DB'));
		});

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
							expect(res.body.messages)
								.toInclude('A user with that email already exists. Please try logging in, or a new email');
							done();
						});
				});
		});

		it('should not save the user if the last name, which is required is missing', (done) => {
			const data = {
				name: {
					first: 'Sean',
				},
				username: 'natac',
				email: 'sean@gmail.com',
			};
			request(app)
				.post('/api/v1/user')
				.send(data)
				.expect(200)
				.end((err, res) => {
					if (err) {
						done(err);
					}
					expect(res.body.success).toEqual(false);
					expect(res.body.messages)
						.toInclude('You are missing the required last name field');
					done();
				});
		});

		it('should not save the user if the last name and email are missing, both are required', (done) => {
			const data = {
				name: {
					first: 'Sean',
				},
				username: 'natac',
			};
			request(app)
				.post('/api/v1/user')
				.send(data)
				.expect(200)
				.end((err, res) => {
					if (err) {
						done(err);
					}
					expect(res.body.success).toEqual(false);
					expect(res.body.messages)
						.toInclude('You are missing the required email field')
						.toInclude('You are missing the required last name field');
					done();
				});
		});

		it('should not save the user if the first name and username are missing, both are required', (done) => {
			const data = {
				name: {
					last: 'Campbell',
				},
				email: 'natac@hotmail.com',
			};
			request(app)
				.post('/api/v1/user')
				.send(data)
				.expect(200)
				.end((err, res) => {
					if (err) {
						done(err);
					}
					expect(res.body.success).toEqual(false);
					expect(res.body.messages)
						.toInclude('You are missing the required first name field')
						.toInclude('You are missing the required username field');
					done();
				});
		});
	});

});
