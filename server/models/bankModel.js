const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const customError = require("../utils/customError");

const bankSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	ifsc_code: {
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
		default: new Date(),
	},

	// forgetToken: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: "otps",
	// },
});

module.exports = mongoose.model("bank", bankSchema);
