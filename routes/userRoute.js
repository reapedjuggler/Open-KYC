const router = require("express").Router();
const bcrypt = require("bcryptjs");
require("dotenv").config();

const env = process.env;

const userService = require("../service/userServices");

router.post("/usersignup", async (req, res) => {
	try {
		var { firstname, lastname, phone, email, adharNo, password } = req.body;

		var check = await userService.findByEmail(email);

		if (Object.keys(check).length) {
			res.send({ success: true, message: "User already exists" });
		}

		var hashedPassword = bcrypt.hash(password, process.env.saltRounds);

		var modelData = {
			firstname: firstname,
			lastname: lastname,
			password: hashedPassword,
			phone: phone,
			email: email,
			adharNo: adharNo,
			panNo: pan_no,
			voterId: voter_id,
			passportId: passport_id,
			createdAt: new Date(),
		};

		var resp = userService.createUser(modelData);

		console.log(resp, "\nIam the resp\n");

		res.send({ success: true, message: "Account created successfully" });
	} catch (err) {
		console.log(err, "\nError in signup\n");
		res.send({ success: false, message: err.message });
	}
});

router.post("/userlogin", async (req, res) => {
	try {
		var { email, password } = req.body;

		var check = await userService.findByEmail(email);

		if (Object.keys(check).length == 0) {
			res.send({
				success: false,
				message: "No account found with that email Id",
			});
		}

		var resp = await userService.findByCredentials(email, password);

		if (Object.keys(resp).length == 0) {
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
