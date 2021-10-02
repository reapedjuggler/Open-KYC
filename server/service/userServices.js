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

	getUserDatafromCorda = async data => {
		try {
			let val = 50011;
			var url = `http://localhost:${val}/ious`;

			let resp = await axios({ method: "GET", url: url });
			console.log("datadgagagagaa", resp.data);
			return { success: true, message: resp.data };
		} catch (err) {
			console.log(err, "\n Iam error in senduserDataToCorda service");
			return { success: false, message: err };
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

	getLatestTransaction = async (data, email) => {
		// for loop ke liye wait ni krri ans=[] return ho jaara
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

				if (email == data[i].email) ans.push(data[i]);

				visSet.add(data[i].aadhar);
			}

			console.log(ans, "\ndata\n");

			ans.filter(async ele => ele.email == email);

			let id = await userModel.findOne({ email: email });
			//console.log(id)
			if (ans && ans.length) {
				ans[0].id = !id || id == null ? "default" : id._id;
			}

			// console.log(ans, "\nI'm ans");

			return { success: true, message: ans };
		} catch (err) {
			return { success: false, message: err };
		}
	};

	checkKycStatus = async (data, email) => {
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

				let index = data[i].borrower.find("=");
				let borrower = data[i].borrower.substring(index + 1),

				if (visSet.has(borrower) == true) continue;


				if (email == data[i].email)
					ans.push({
						user: email,
						bank: borrower,
						approval: data[i].approval,
					});

				visSet.add(borrower);
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
