const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
	description: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = { Exercise };
