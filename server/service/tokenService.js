const bcrypt = require("bcryptjs");
const axios = require("axios");

//Models
const bankModel = require("../models/bankModel");
const userModel = require("../models/userModel");

const customError = require("../utils/customError");

// constants
let prodUrl = "http://localhost:50006/create-iou";
class Token {
	// createToken = async data => {
	// 	try {
	// 		let url = `http://localhost:${data.port}/create-iou`;

	// 		const params = new URLSearchParams();
	// 		params.append("email", data.email);
	// 		params.append("timestamp", "date");
	// 		params.append("type_of_transaction", data.typeOfTransaction);
	// 		params.append("bank", data.bank);

	// 		params.append(
	// 			"partyName",
	// 			data.partyName == "50011"
	// 				? "O=UserA,L=London,C=GB"
	// 				: "O=UserB,L=London,C=GB"
	// 		);
	// 		params.append("iouValue", 17);
	// 		const config = {
	// 			headers: {
	// 				"Content-Type": "application/x-www-form-urlencoded",
	// 			},
	// 		};

	// 		const resp = await axios.post(url, params, config);

	// 		return { success: true, data: resp };
	// 	} catch (err) {
	// 		return { success: false, message: err.message };
	// 	}
	// };

	getPartyNameFromCorda = async data => {
		try {
			let val = data.port;
			let url = `http://localhost:${val}/me`;

			const resp = await axios({ method: "GET", url: url });
			// console.log("Iam the data\n", resp.data);
			return { success: true, message: resp.data };
		} catch (err) {
			return { success: false, message: err.message };
		}
	};

	trackAndTrace = async data => {
		try {
			let url = `http://localhost:${data.port}/create-iou`;

			const params = new URLSearchParams();
			params.append("email", data.email);
			params.append("timestamp", "date");
			params.append("type_of_transaction", data.typeOfTransaction);
			params.append("bank", data.bank);

			params.append("partyName", data.partyName);
			params.append("iouValue", 17);
			const config = {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			};

			const resp = await axios.post(url, params, config);

			return { success: true, datgTa: resp };
		} catch (err) {
			return { success: false, message: "Error in trackAndTrace service" };
		}
	};

	getTrackingDetails = async data => {
		try {

			

			return { success: true, message: ans };
		} catch (err) {}
	};
}

module.exports = exports = new Token();
