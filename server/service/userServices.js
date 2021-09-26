const bcrypt = require("bcryptjs");

const UserModel = require("../models/userModel");
const customError = require("../utils/customError");

class User {
	createUser = async data => {
		const user = new UserModel({
			firstName: data.firstname,
			lastName: data.lastname,
			email: data.email,
			panNo: data.panNo,
			password: data.password,
			phone: data.phone,
			createdAt: new Date(),
			adharNo: data.adharNo,
			passportId: data.passportId,
			voterId: data.voterId,
		});

		return user.save();
	};
}

module.exports = exports = new User();
