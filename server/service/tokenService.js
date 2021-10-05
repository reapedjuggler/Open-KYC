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
			let val = process.env.trackPort || 50086;
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

			return { success: true, message: resp };
		} catch (err) {
			return { success: false, message: "Error in trackAndTrace service" };
		}
	};

	getAllTrackingDetails = async data => {
		try {
			var url = `http://localhost:${data.port}/ious`;

			let resp = await axios({ method: "GET", url: url });
			// console.log("Iam the data in tokenService getAllTrackingDetails", resp.data);

			let ans = [];

			ans = resp.data.filter(
				ele => ele.bank == data.bankEmail || ele.email == data.bankEmail
			);

			return { success: true, message: ans };
		} catch (err) {
			return {
				success: false,
				message: "Error in getAllTrackingDetails service",
			};
		}
	};

	getTrackingDetails = async (resp, data) => {
		try {
			let ans = [];

			resp.forEach(
				ele => ele.bank == data.userEmail || ele.email == data.userEmail
			);

			return { success: true, message: ans };
		} catch (err) {}
	};
}

module.exports = exports = new Token();
