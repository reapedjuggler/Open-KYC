const bcrypt = require("bcryptjs");

const bankModel = require("../models/bankModel");
const customError = require("../utils/customError");

class Bank {
	createBank = async data => {
		const user = new bankModel({
			name: data.name,
			ifsc_code: data.ifsc_code,
			email: data.email,
			password: data.password,
			createdAt: new Date(),
		});

		return user.save();
	};
}

module.exports = exports = new Bank();
