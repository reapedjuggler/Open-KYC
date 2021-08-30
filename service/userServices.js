const bcrypt = require("bcryptjs");

const UserModel = require("../models/userModel");
const customError = require("../utils/customError");

const createUser = async data => {
	const user = new UserModel({
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		password: data.password,
		phone: data.phone,
		createdAt: new Date(),
		adharNo: data.adharNo,
		passportId: data.passportId,
		voterId: data.voterId,
	});

	return user.save();
};

const findByCredentials = async (email, password) => {
	const user = await findByEmail(email);
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

const findById = async userId => {
	const user = await UserModel.findOne({ _id: userId });
	if (!user)
		throw customError(401, `user not found with this ${userId} user id`);

	return user;
};

const findByEmail = async email => {
	const user = await UserModel.findOne({ email });
	return user;
};

module.exports = {
	createUser,
	findByCredentials,
	findByEmail,
	findById,
};
