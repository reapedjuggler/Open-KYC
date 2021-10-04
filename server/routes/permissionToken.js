const router = require("express").Router();

// Service
const userService = require("../service/userServices");
const bankService = require("../service/bankService");
const tokenService = require("../service/tokenService");

router.post("/createtoken", async (req, res, next) => {
	try {
		const { email, typeOfTransaction, bank } = req.body;

		const cordaData = {
			email: email,
			typeOfTransaction: typeOfTransaction,
			port: process.env.tokenPort || 50073,
			bank: bank,
			partyName: "",
		};

		let partyName = await bankService.getPartyNameFromCorda(bank);

		if (partyName.success === true) {
			partyName = partyName.message.me;

			cordaData.partyName = partyName;

			let respFromCorda = await tokenService.createToken(cordaData);

			if (respFromCorda.success === true) {
				res.send({ success: true, message: "Token generated successfully." });
			} else {
				res.send({
					success: true,
					message: "Error in create token service in /createtoken",
				});
			}
		} else {
			res.send({
				success: false,
				message: "Error in /createtoke in partyname service",
			});
		}
	} catch (err) {
		res.send({ success: false, message: "Error in /createtoken route" });
	}
});
