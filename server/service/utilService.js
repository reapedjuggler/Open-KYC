const bcrypt = require("bcryptjs");
require("dotenv").config();

class UtilService {
	constructor() {}

	// Service to find email in MONGO
	findByEmail = async (email, model) => {
		try {
			const user = await model.findOne({ email: email });
			if (user == undefined || user == null || Object.keys(user).length == 0) {
				return {};
			}
			return user;
		} catch (err) {
			{
			}
		}
	};

	// Service to find ID in MONGO
	findById = async (userId, model) => {
		try {
			const user = await model.findOne({ _id: userId });

			if (user == undefined || user == null || Object.keys(user).length == 0) {
				return {};
			}

			return user;
		} catch (err) {
			return {};
		}
	};

	// Service to find User by findByCredentials
	findByCredentials = async (email, password, model) => {
		try {
			const user = await this.findByEmail(email, model);

			if (user == undefined || user == null || Object.keys(user).length == 0) {
				return {};
			}
			return user;
		} catch (err) {
			return {};
		}
	};

	// Creating the hashed password
	hashUtil = async password => {
		try {
			const salt = await bcrypt.genSalt(parseInt(process.env.saltRounds));
			const hashedPassword = await bcrypt.hash(password, salt);
			return hashedPassword;
		} catch (err) {
			return { success: false };
		}
	};
}
module.exports = exports = new UtilService();
