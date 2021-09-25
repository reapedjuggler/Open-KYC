const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const customError = require("../utils/customError");

const otpSchema = new mongoose.Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	token: {
		type: String,
		required: true,
	},
	expireAt: {
		type: Date,
		default: new Date(),
		index: { expires: 60 * 60 * 24 },
	},
});

module.exports = mongoose.model("otps", otpSchema);
