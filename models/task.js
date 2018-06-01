const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema (
	{
		title: {
			type: String,
			required: 'please add a name for the task'
		},
		description: {
			type: String,
			required: 'please add a description for the task'
		},
		created: {
			type: Date,
			default: Date.now
		},
		duration: {
			type: Number,
			required: 'please add a duration'
		},
	}
);

module.exports = mongoose.model('Task', TaskSchema);