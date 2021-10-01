const router = require("express").Router();
const axios = require("axios")
// Models
const userModel = require("../models/userModel");

// Services
const userService = require("../service/userServices");
const bankService = require("../service/bankService");

// const fileData = require("../data.json");

router.post("/apply", async (req, res, next) => {
	try {
		// whether this email already exists in corda
		// your email exists so you need to authorize only

		const { bank, email, aadhar, pan } = req.body;

		// whether this email exists or not in mongo

		let resp = await userModel.find({ email: email });

		if (Object.keys(resp).length == 0) {
			res.send({
				success: false,
				message: "Please signup before proceeding for KYC",
			});
		} else {
			const cordaData = {
				aadhar: aadhar,
				pan: pan,
				email: email,
				bank: bank == "A" ? 50006 : 50033,
				partyName: "",
				approval: "false"
			};

			// console.log(req.body);

			let partyName = await userService.getPartyNameFromCorda(bank);
			console.info(partyName);

			cordaData.partyName = partyName.message.me;

			let respFromCord = await userService.sendUserDataToCorda(cordaData);

			if (respFromCord.success == false)
				throw new Error({ success: false, message: respFromCord.message });

			// console.log(respFromCord, "Iam the corda data\n");

			res.send({ success: true, message: "Requested for Kyc" });
		}
	} catch (err) {
		res.send({ success: false, message: err.message });
	}
});

router.post("/approve", async (req, res) => {
	//if false then approve

	try {
		let data = req.body.bank == "A" ? 50006 : 50033;

		let email = req.body.email;

		let resp = await bankService.getUserDatafromCorda(data);
		resp=resp.data
		// let resp = fileData;
		let temp = [];

		for (let i = 0; i < resp.length; i++) {
			temp.push(resp[i].state.data);
		}
		console.log(resp)
		let getLatestTransaction = await bankService.getLatestTransaction(
			temp,
			email
		);

		// console.log(getLatestTransaction, "  sad\n\n");

		const cordaData = {
			aadhar: getLatestTransaction[0].aadhar,
			pan: getLatestTransaction[i].pan,
			email: email,
			bank: data == "A" ? 50006 : 50033,
			partyName: "",
			approval: "true",
		};

		let respCorda = await bankService.sendBankDataToCorda(cordaData);

		if (respFromCorda.success == false) {
			res.send({
				success: false,
				message: "Error in api of getting latest transaction",
			});
		} else {
			//approve call approveUsertoCorda etc
			res.send({ success: true, message: "approved" });
		}
	} catch (err) {
		res.send({ success: false, message: err.message });
	}
});

router.post("/getapprovals", async (req, res) => {
	try {
		let data = req.body.bank == "A" ? 50006 : 50033;

		let respFromCorda = await bankService.getUserDatafromCorda(data);
		console.log(respFromCorda)
		respFromCorda = respFromCorda.data;

		// let respFromCorda = fileData;
		 let temp = [];

		for (let i = 0; i < respFromCorda.length; i++) {
			temp.push(respFromCorda[i].state.data);
		}

		// console.log(respFromCorda);

		let respData = await bankService.getApprovalLists(temp);

		if (respData.success == false) throw new Error("No Data Found");

		res.send({ success: true, message: respData.message });
	} catch (err) {
		console.log(err);
		res.send({ success: false, message: err });
	}
});
module.exports = exports = {
	router,
};
