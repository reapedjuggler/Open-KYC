const bcrypt = require("bcryptjs");

//Models
const bankModel = require("../models/bankModel");

const customError = require("../utils/customError");

// constants
let url = "http://localhost:50006/";

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
		let url = "";
		// axios request for posting the data to CordA
		// append adhar no pan no and email to the url

		// http://localhost:50006/create-iou?iouValue=89&partyName=<partyName>&aadhar=<aadhar>&pan=<pan>&email=<email>

		url = url + `&${data.panNo}&${data.adharNo}&${data.email}`;

		let resp = await axios({ method: "GET", url: url });
		return { success: true, data: resp };
	};
}

module.exports = exports = new Bank();
