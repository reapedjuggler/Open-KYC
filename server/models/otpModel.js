const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const customError = require("../utils/customError");

const otpSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		ref: "user",
	},
	otp: {
		type: String,
		required: true,
	},
	expireAt: {
		type: Date,
		default: new Date(),
		index: { expires: 60 },
	},
});

module.exports = mongoose.model("otps", otpSchema);
