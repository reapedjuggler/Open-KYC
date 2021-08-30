const mongoose = require("mongoose");

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
	},
	createdAt: {
		type: Date,
	},

	panNo: {
		type: String,
	},
	passportId: {
		type: String,
	},

	voterId: {
		type: String,
	},

});


module.exports = mongoose.model("user", userSchema);
