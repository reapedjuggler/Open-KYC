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
	phone: {
		type: Number,
	},
	adharNo: {
		type: String,
		default: "",
	},
	createdAt: {
		type: Date,
		default: "",
	},

	panNo: {
		type: String,
		default: "",
	},
	passportId: {
		type: String,
		default: "",
	},

	voterId: {
		type: String,
		default: "",
	},

	// forgetToken: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: "otps",
	// 	default: "",
	// },
});

module.exports = mongoose.model("user", userSchema);
