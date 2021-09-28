const router = require("express").Router();
const bcrypt = require("bcryptjs");
require("dotenv").config();

//Models
const userModel = require("../models/userModel");

// Services
const userService = require("../service/userServices");
const utilService = require("../service/utilService");

router.post("/signup", async (req, res) => {
	try {
		var { firstName, lastName, email, password } = req.body;

		// UUID --> Every Bank will generate this UUID for every user-

		var check = await utilService.findByEmail(email, userModel);

		if (check != null && Object.keys(check).length) {
			res.send({ success: false, message: "User already exists" });
		} else {
			const hashedPassword = await utilService.hashUtil(password);

			var modelData = {
				firstname: firstName,
				lastname: lastName,
				password: hashedPassword,
				email: email,
				createdAt: new Date(),
			};

			var resp = await userService.createUser(modelData);

			res.send({ success: true, message: "Account created successfully" });
		}
	} catch (err) {
		console.log(err, "\nError in signup\n");
		res.send({ success: false, message: err });
	}
});

router.post("/login", async (req, res) => {
	try {
		var { email, password } = req.body;

		var check = await utilService.findByEmail(email);

		if (Object.keys(check).length == 0) {
			res.send({
				success: false,
				message: "No account found with that email Id",
			});
		}

		var resp = await utilService.findByCredentials(email, password, userModel);

		console.log(resp);

		if (Object.keys(resp).length > 0) {
			res.send({ success: true, message: "You are Logged in" });
		} else {
			res.send({ success: false, message: "Invalid Credentials" });
		}
	} catch (err) {
		console.log(err, "\nError in login\n");
		res.send({ success: false, message: err.message });
	}
});

router.post("/kyc", async (req, res, next) => {
	try {
		const { bank, email, adharNo, panNo } = req.body;

		let dataForCorda = {
			bank: bank,
			adharNo: adharNo,
			panNo: panNo,
			email: email,
		};

		let respFromCord = await userService.sendUserDataToCorda(dataForCorda);

		res.send({ success: true, message: "Requested for Kyc" });
	} catch (err) {
		res.send({ success: false, message: err.message });
	}
});

module.exports = exports = {
	router,
};
