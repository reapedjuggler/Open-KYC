const router = require("express").Router();
const bcrypt = require("bcryptjs");
require("dotenv").config();

const env = process.env;

//Models
const bankModel = require("../models/bankModel");
const userModel = require("../models/userModel");
const otpModel = require("../models/otpModel");
// Services:-
const bankService = require("../service/bankService");
const utilService = require("../service/utilService");
const mail = require("../service/mail");

// Constants
const sender = "tomarvibhav55@gmail.com";

const generateOtp = () => {
	const OTP = "_" + Math.random().toString(36).substr(2, 9);
	return OTP;
};

router.post("/getuserdetails", async (req, res) => {
	try {
		let resp = await utilService.findByEmail(req.body.email, bankModel);

		let resp1 = {
			name: resp.name,
			ifsc_code: resp.ifsc_code,
			email: resp.email,
			createdAt: resp.createdAt,
			_id: resp._id,
		};

		if (resp != null) {
			res.send({ success: true, message: resp1 });
		} else {
			resp = await utilService.findByEmail(req.body.email, userModel);

			resp1 = {
				name: resp.name,
				email: resp.email,
				createdAt: resp.createdAt,
				_id: resp._id,
			};

			if (resp != null) {
				res.send({ success: true, message: resp1 });
			} else {
				res.send({ success: false, message: "No user exist" });
			}
		}
	} catch (err) {
		res.send({ success: false, message: err.message });
	}
});

router.post("/forgotpassword", async (req, res) => {
	try {
		const otp = generateOtp();
		const linkOtp = generateOtp();

		const { link, email } = req.body;

		// Save this Otp in otpModel

		await otpModel.create({ email: email, otp: otp });

		const data = `
			<h1>Hey user you have requested for a new password please use this link to login<h1>
			<p> Please enter this OTP ${otp} at this link ${link + "/" + linkOtp} </p>
			<p> If this mail wasn't requested by you then please ignore this message</p>.

		`;

		await mail.mailService(sender, req.body.email, data);

		res.send({ success: true, message: "Forgot password mail sent" });
	} catch (err) {
		console.log(err);
		res.send({ success: false, message: "Error in loggin in" });
	}
});

router.post("/checkotp", async (req, res) => {
	try {
		const { otp, email } = req.body;

		let resp = await otpModel.find({ email: email });

		if (Object.keys(resp).length == 0) {
			res.send({ success: false, message: "Otp Expired" });
		} else {
			if (otp != resp[0].otp) {
				res.send({ success: false, message: "Invalid Otp" });
			} else {
				res.send({ success: true, message: "Changing your password" });
			}
		}
	} catch (err) {
		res.send({ success: false, message: err });
	}
});

router.post("/changepassword", async (req, res) => {
	try {
		let { newPassword, email } = req.body;

		let resp = await bankModel.findOne({ email: email });

		if (Object.keys(resp).length > 0) {
			const newPasswordHashed = utilService.hashUtil(newPassword);

			resp.password = newPasswordHashed;
			await bankModel.findOneAndUpdate({ email: email }, { $set: resp });
		} else {
			resp = await userModel.findOne({ email: email });
		}
	} catch (err) {
		console.log(err);
		res.send({ success: false, message: "Password was not changed" });
	}
});

module.exports = exports = {
	router,
};
// firstName:Reaped
// lastName:Juggler
// email:tomarvibhav55@gmail.com
// password:Hello123
// phone:7000305373
// adharNo:234324234
// panNo:1234
// voterId:234234
// passportId:23463287
