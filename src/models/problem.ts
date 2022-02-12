import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
	constestId: String,
	index: String,
	name: String,
	tags: [String],
	rating: Number,
	frequency: Number,
});

const Problem = mongoose.model('Problem', problemSchema);

export = Problem;
