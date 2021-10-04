const bcrypt = require("bcryptjs");
require("dotenv").config();

class UtilService {
	constructor() {}

	findByEmail = async (email, model) => {
		const user = await model.findOne({ email: email });
		// console.log(user);
		return user;
	};

	findById = async (userId, model) => {
		const user = await model.findOne({ _id: userId });
		if (!user)
			throw customError(401, `user not found with this ${userId} user id`);

		return user;
	};

	findByCredentials = async (email, password, model) => {
		const user = await this.findByEmail(email, model);
		if (!user)
			throw customError(401, `user does not exist with this ${email} email`);

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (err) reject(customError(400, err.message));

				if (!result) reject(customError(401, "Invalid Password"));

				return resolve(user);
			});
		});
	};

	hashUtil = async password => {
		const salt = await bcrypt.genSalt(parseInt(process.env.saltRounds));
		const hashedPassword = await bcrypt.hash(password, salt);

		return hashedPassword;
	};
}
module.exports = exports = new UtilService();
