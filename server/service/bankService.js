const bcrypt = require("bcryptjs");
const axios = require("axios");

//Models
const bankModel = require("../models/bankModel");
const userModel = require("../models/userModel");

const customError = require("../utils/customError");

// constants
let url = "http://localhost:50006/create-iou";
class Bank {
	createBank = async data => {
		try {
			const user = new bankModel({
				name: data.name,
				ifsc_code: data.ifsc_code,
				email: data.email,
				password: data.password,
				createdAt: new Date(),
			});
			return user.save();
		} catch (err) {
			return { success: false, message: "Mongo Error in creating Bank" };
		}
	};
	getUserDatafromCorda = async data => {
		try {
			var url = `http://localhost:${data}/ious`;

			let resp = await axios({ method: "GET", url: url });
			// console.log("datadgagagagaa", resp.data);
			return { success: true, message: resp.data };
		} catch (err) {
			console.log(err, "\n Iam error in senduserDataToCorda service");
			return { success: false, message: err };
		}
	};

	getPartyNameFromCorda = async data => {
		try {
			let val = data == "A" ? 50006 : 50033;
			let url = `http://localhost:${val}/me`;

			const resp = await axios({ method: "GET", url: url });
			// console.log("Iam the data\n", resp.data);
			return { success: true, message: resp.data };
		} catch (err) {
			return { success: false, message: err.message };
		}
	};
	sendBankDataToCorda = async data => {
		try {
			url = `http://localhost:${data.bank}/create-iou`;

			const params = new URLSearchParams();
			params.append("email", data.email);
			params.append("pan", data.pan);
			params.append("aadhar", data.aadhar);
			params.append("approval", data.approval);
			params.append("timestamp", "date");
			params.append(
				"partyName",
				data.partyName == "50011"
					? "O=UserA,L=London,C=GB"
					: "O=UserB,L=Bangalore,C=IN"
			);
			params.append("iouValue", 17);
			const config = {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			};

			const resp = await axios.post(url, params, config);
			// console.log("snedBankdnadg", url);
			return { success: true, data: resp };
		} catch (err) {
			console.log(err);

			return { sucess: false, message: "Problem in sending data" };
		}
	};

	// getApprovalListForASingleUser = async (user, arr) => {
	// 	try {
	// 		let bankWhoApproved = [];

	// 		return { sucess: true, message: bankWhoApproved };
	// 	} catch (err) {
	// 		return { success: false, message: err.message };
	// 	}
	// };

	getApprovalLists = async (respFromCorda, respFromCordaFromUser) => {
		try {
			let visSet = new Set();

			let ans = []; // Array to store approval lists

			await respFromCorda.sort(async (ele, ele1) => {
				let keyA = new Date(ele.timestamp),
					keyB = new Date(ele1.timestamp);

				if (keyA < keyB) return -1;

				if (keyA > keyB) return 1;

				return 0;
			});

			for (let i = respFromCorda.length - 1; i >= 0; i--) {
				if (visSet.has(respFromCorda[i].email) == true) continue;

				ans.push(respFromCorda[i]);

				visSet.add(respFromCorda[i].email);
			}

			// ans --> Latest Transactions

			for (let i = 0; i < ans.length; i++) {
				// is user yaani ki ith user ke liye mujhko respFromCordaFromUser mai se wo
				// bank cahe jinhone isko approve kar diya hai

				// ek or utility function banate hai jisme sirf hum bhejege
				// ek user or ek or array ko y operation perform karege

				let newEle = {
					email: "",
					name: "Test",
					aadhar: true,
					pan: true,
					id: "",
					approval: "false",
					approved_by: [],
				};

				let id = await userModel.findOne({ email: newEle.email });

				let name = id == null ? "Batman" : id.name;

				id = id == null ? "default" : id._id;

				newEle.email = ans[i].email;
				newEle.name = name;
				newEle.id = id;
				newEle.aadhar = ans[i].aadhar;
				newEle.pan = ans[i].pan;
				newEle.approval = ans[i].approval;

				let bankWhoApproved = respFromCordaFromUser.filter(
					ele => ele.approval == "true"
				);

				newEle.approved_by = bankWhoApproved;

				ans[i] = newEle;
			}

			let approved = [],
				pending = [];
			// console.log("ans", ans);
			approved = ans.filter(ele => ele.approval == "true");
			pending = ans.filter(ele => ele.approval == "false");

			// console.log(approved, "\n\n");
			// console.log(pending, "\n\n");
			return {
				success: true,
				message: {
					approved: approved,
					pending: pending,
				},
			};
		} catch (err) {
			console.log(err);
			return { success: false, message: err.message };
		}
	};
}

module.exports = exports = new Bank();
