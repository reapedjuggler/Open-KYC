//This service is made entirely for track and trace ledger

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

	
	// For getting the partyName of a particular user or Bank in r3Corda
	getPartyNameFromCorda = async data => {
		try {
			let val = process.env.trackPort || 50086;
			let url = `http://localhost:${val}/me`;

			const resp = await axios({ method: "GET", url: url });
			return { success: true, message: resp.data };
		} catch (err) {
			return { success: false, message: err.message };
		}
	};

	// For tracking all the responses made by the user to this bank
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

	// Getting all the tracking details for a particular bank
	getAllTrackingDetails = async data => {
		try {
			var url = `http://localhost:${data.port}/ious`;
			const fileData = require("../data3.json");
			//let resp = await axios({ method: "GET", url: url });
			let resp = fileData;
			// console.log("Iam the data in tokenService getAllTrackingDetails", resp.data);

			let ans = [];

			ans = resp.filter(
				ele =>
					ele.state.data.bank == data.bankEmail ||
					ele.state.data.email == data.bankEmail
			);
			return { success: true, message: ans };
		} catch (err) {
			return {
				success: false,
				message: "Error in getAllTrackingDetails service",
			};
		}
	};

	// Get all the responses here for a particular user
	getTrackingDetails = async (resp, data) => {
		try {
			let ans = [];

			ans = resp.filter(
				ele =>
					ele.state.data.bank == data.userEmail ||
					ele.state.data.email == data.userEmail
			);
			return { success: true, message: ans };
		} catch (err) {
			console.log(err);
			return { success: false, message: err };
		}
	};
}

module.exports = exports = new Token();
