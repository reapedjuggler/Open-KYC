const router = require("express").Router();
const bcrypt = require("bcryptjs");
require("dotenv").config();
const env = process.env;

router.post("/signup", async (req, res) => {
	try {
		var { firstname, lastname, phone, email, adharNo, password } = req.body;

		var check = await User.find({ email: email });

		if (check != []) {
			res.send({ success: false, message: "Account already exist" });
		}

		var hashedPassword = bcrypt.hash(password, process.env.saltRounds);

		var modelData = {
			firstname: firstname,
			lastname: lastname,
			password: hashedPassword,
			phone: phone,
			email: email,
			adharNo: adharNo,
		};

		var data = new User(modelData);

		var resp = await User.create(data);

		console.log(resp, "\nIam the resp\n");

		res.send({ success: true, message: "Account created successfully" });
	} catch (err) {
		console.log(err, "\nError in signup\n");
		res.send({ success: false, message: err.message });
	}
  
});

router.post("/login", async (req, res) => {
	try {
		var { email, password } = req.body;

		var check = await User.find({ email: email });

		if (check != []) {
			res.send({
				success: false,
				message: "Account doesn't exist, Please create a new one",
			});
		}

		var resp = await bcrypt.compare(password, check.password);

		if (resp == true) {
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

