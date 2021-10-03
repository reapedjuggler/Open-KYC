const bcrypt = require("bcryptjs");
const axios = require("axios");

//Models
const bankModel = require("../models/bankModel");
const userModel = require("../models/userModel");

const customError = require("../utils/customError");

// constants
let url = "http://localhost:50006/create-iou";
class Bank {
	getUserDatafromCorda = async data => {
		try {
			
			var url = `http://localhost:${data}/ious`;

			let resp = await axios({ method: "GET", url: url });
			console.log("datadgagagagaa", resp.data);
			return { success: true, message: resp.data };
		} catch (err) {
			console.log(err, "\n Iam error in senduserDataToCorda service");
			return { success: false, message: err };
		}
	};
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
					: "O=UserB,L=London,C=GB"
			);
			params.append("iouValue", 17);
			const config = {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			};

			const resp = await axios.post(url, params, config);
			console.log("snedBankdnadg", url);
			return { success: true, data: resp };
		} catch (err) {
			console.log(err);

			return { sucess: false, message: "Problem in sending data" };
		}
	};

	getApprovalLists = async respFromCorda => {
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
				if (visSet.has(respFromCorda[i].aadhar) == true) continue;
				ans.push(respFromCorda[i]);
				visSet.add(respFromCorda[i].aadhar);
			}

			for (let i = 0; i < ans.length; i++) {
				let newEle = {
					email: "",
					name: "Test",
					aadhar: true,
					pan: true,
					id: "",
					approval: "false",
				};

				newEle.email = ans[i].email;
				let id = await userModel.findOne({ email: newEle.email });

				let name = id == null ? "Batman" : id.firstName + id.lastName;

				id = id == null ? "default" : id._id;

				newEle.name = name;
				newEle.id = id;
				newEle.aadhar = ans[i].aadhar;
				newEle.pan = ans[i].pan;
				newEle.approval = ans[i].approval;
				ans[i] = newEle;
			}

			let approved = [],
				pending = [];
			console.log("ans", ans);
			approved = ans.filter(ele => ele.approval == "true");
			pending = ans.filter(ele => ele.approval != "true");

			console.log(approved, "\n\n");
			console.log(pending, "\n\n");
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
