const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const customError = require("../utils/customError");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: "",
	},
	
	// phone: {
	// 	type: Number,
	// },
	// forgetToken: {
	// 	type: Schema.Types.ObjectId,
	// 	default: "",
	// },
});

module.exports = mongoose.model("user", userSchema);
