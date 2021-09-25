const router = require("express").Router();
const bcrypt = require("bcryptjs");
require("dotenv").config();

const env = process.env;

//Models
const bankModel = require("../models/bankModel");

// Services:-
const bankService = require("../service/bankService");
const utilService = require("../service/utilService");

router.post("/signup", async (req, res) => {
	try {
		var { email, password } = req.body;

		var check = await utilService.findByEmail(email, bankModel);

		if (check != null && Object.keys(check).length) {
			res.send({ success: true, message: "User already exists" });
		} else {
			const hashedPassword = await utilService.hashUtil(password);

			var modelData = {
				name: req.body.name,
				ifsc_code: req.body.ifsc_code,
				email: req.body.email,
				password: hashedPassword,
				createdAt: new Date(),
			};

			modelData.password = hashedPassword;

			var resp = await bankService.createBank(modelData);

			res.send({ success: true, message: "Account created successfully" });
		}
	} catch (err) {
		console.log(err, "\nError in signup\n");
		res.send({ success: false, message: err.message });
	}
});

router.post("/login", async (req, res) => {
	try {
		var { email, password } = req.body;

		var check = await utilService.findByEmail(email, bankModel);

		if (Object.keys(check).length == 0) {
			res.send({
				success: false,
				message: "No account found with that email Id",
			});
		}

		var resp = await utilService.findByCredentials(email, password, bankdModel);

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

module.exports = exports = {
	router,
};
