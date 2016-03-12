import mongoose, { Schema } from 'mongoose';

const options = { timestamps: true };
const reEmail = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;

const User = new Schema({
	name: {
		first: {
			type: String,
			required: true,
			trim: true,
		},
		last: {
			type: String,
			required: true,
			trim: true,
		},
	},
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	password: String,
	avatar: { type: String, match: /urlRegex/ },
	email: {
		type: String,
		match: reEmail,
		required: true,
		unique: true,
	},
	contacts: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
	}],
	blocked: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
	}],
	channels: [{
		type: Schema.Types.ObjectId,
		ref: 'Channel',
	}],
	socials: [Schema.Types.Mixed],
}, options);

User.virtual('name.full').get(function getFullName() {
	return `${this.name.first} ${this.name.last}`;
});
User.virtual('name.full').set(function setFullName(value) {
	const [first, last] = value.split(' ');
	this.name.first = first;
	this.name.last = last;
});

export default mongoose.model('User', User);
