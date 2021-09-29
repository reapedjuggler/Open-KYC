const bcrypt = require("bcryptjs");

//Models
const bankModel = require("../models/bankModel");

const customError = require("../utils/customError");

// constants
let url = "http://localhost:50006/create-iou";
class Bank {
	createBank = async data => {
		const user = new bankModel({
			name: data.name,
			ifsc_code: data.ifsc_code,
			email: data.email,
			password: data.password,
			createdAt: new Date(),
		});

		return user.save();
	};

	sendBankDataToCorda = async data => {
		try {
			// http://localhost:50006/create-iou?iouValue=89&partyName=<partyName>&aadhar=<aadhar>&pan=<pan>&email=<email>

			// url =
			// 	url +
			// 	`partyName=${data.bank}&aadhar=${data.adharNo}&pan=${data.pan}&email=${data.email}`;

			url = `http://localhost:${data.bank}/create-iou`;

			const params = new URLSearchParams();
			params.append("email", data.email);
			params.append("pan", data.pan);
			params.append("aadhar", data.aadhar);
			params.append("approval", "false");

			params.append("partyName", data.bank);
			params.append("iouValue", 17);
			const config = {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			};

			console.log(url);

			const resp = await axios.post(url, params, config);

			
			return { success: true, data: resp };
		} catch (err) {
			return { sucess: false, message: "Problem in sending data" };
		}
	};
}

module.exports = exports = new Bank();
