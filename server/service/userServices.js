const bcrypt = require("bcryptjs");
const customError = require("../utils/customError");

// Models
const userModel = require("../models/userModel");

// Constants
const axios = require("axios");
class User {
	createUser = async data => {
		try {
			const user = new UserModel({
				firstName: data.firstname,
				lastName: data.lastname,
				email: data.email,
				password: data.password,
				createdAt: new Date(),
			});

			await user.save();

			return { success: true, message: "Data Saved" };
		} catch (err) {
			console.log(err);
			return { success: false, message: err.message };
		}
	};

	sendUserDataToCorda = async data => {
		try {
			var val = 50011;
			var url = `http://localhost:${val}/create-iou`;
			console.log("lol", typeof url);

			const params = new URLSearchParams();
			params.append("email", data.email);
			params.append("pan", data.pan);
			params.append("aadhar", data.aadhar);
			params.append("approval", "false");
			params.append("timestamp", "date");
			params.append("partyName", data.partyName);
			params.append("iouValue", 17);
			const config = {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			};

			console.log("bas data", data);
			const resp = await axios.post(url, params, config);
			console.log(resp);
			return { success: true, data: resp };
		} catch (err) {
			console.log(err);
			return { success: false, message: "Problem in sending data\n" + err };
		}
	};

	checkKycStatus = async data => {
		// [ { user: email, bank: BankA , status: "pending" }]
		// Cope and Seethe

		try {
			let visSet = new Set();
			console.log(data);
			let ans = []; // Array to store approval lists

			await data.sort(async (ele, ele1) => {
				let keyA = new Date(ele.timestamp),
					keyB = new Date(ele1.timestamp);

				if (keyA < keyB) return -1;

				if (keyA > keyB) return 1;

				return 0;
			});

			for (let i = data.length - 1; i >= 0; i--) {
				if (visSet.has(data[i].aadhar) == true) continue;

				let index = data[i].borrower.find("=");

				if (email == data[i].email)
					ans.push({
						user: email,
						bank: data[i].borrower.substring(index + 1),
						approval: data[i].approval,
					});

				visSet.add(data[i].aadhar);
			}

			// console.log(ans, "\nI'm ans");
			return { success: true, message: ans };
		} catch (err) {
			return { success: false, message: err.message };
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
}

module.exports = exports = new User();
