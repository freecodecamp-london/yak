import mongoose from 'mongoose';

after((done) => {
	mongoose.connection.close()
		.then(() => {
			console.log('Connection to DB closed');
			done();
		});
});
