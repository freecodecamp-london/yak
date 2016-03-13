import mongoose from 'mongoose';


async function connectDB(env, mongoUri) {
	if (env === 'development') {
		// connect to the the local yak db.
		try {
			const connection = await mongoose.connect(`${mongoUri}-development`);
			console.log('Connected to development DB: yak-development');
			return connection;
		} catch (err) {
			console.log(err);
		}
	} else if (env === 'test') {
		try {
			const connection = await mongoose.connect(`${mongoUri}-test`);
			console.log('Connected to test DB: yak-test');
			return connection;
		} catch (err) {
			console.log(err);
		}
	}
	return mongoose.connect(mongoUri);
}

export default connectDB;

