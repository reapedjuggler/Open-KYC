// This service is entirely made for fetching and creating user details from Blockchain

const bcrypt = require("bcryptjs");
const customError = require("../utils/customError");
const r3Corda = require("../r3corda");

// Models
const userModel = require("../models/userModel");

// For development purposes only do make sure to comment this while in live server ///******IMP *//////
// const fileData1 = require("../data1.json");

// API
const axios = require("axios");
class User {
	// For creating a new User in REST
	createUser = async data => {
		try {
			const user = new userModel({
				name: data.name,
				email: data.email,
				password: data.password,
				createdAt: new Date(),
			});

			await user.save();
			return { success: true, message: "Data Saved" };
		} catch (err) {
			return { success: false, message: err.message };
		}
	};

	// Getting partyname in blockchain for a particular user
	getPartyNameFromCorda = async data => {
		try {
			let val = data == r3Corda.bankFromBlockchain ? 50011 : 50071;
			let url = `http://localhost:${val}/me`;

			const resp = await axios({ method: "GET", url: url });
			// console.log("Iam the data\n", resp.data);
			return { success: true, message: resp.data };
		} catch (err) {
			return { success: false, message: err.message };
		}
	};

	//Getting all the user data from CORDA 
	getUserDatafromCorda = async data => {
		try {
			var url = `http://localhost:${data}/ious`;

			// let resp = { data: fileData1 }; // When testing locally uncomment

			let resp = await axios({ method: "GET", url: url });
			return { success: true, message: resp.data };
		} catch (err) {
			return { success: false, message: err };
		}
	};

	// Sending all the user data from CORDA 
	sendUserDataToCorda = async (data, num) => {
		try {
			var val = data.port;
			var url = `http://localhost:${val}/create-iou`;
			// console.log("lol", typeof url);

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

			const resp = await axios.post(url, params, config);
			return { success: true, data: resp };
		} catch (err) {
			console.log(err);
			return { success: false, message: "Problem in sending data\n" + err };
		}
	};

	// Getting the latest transaction made by this user
	getLatestTransaction = async (data, email) => {
		// for loop ke liye wait ni krri ans=[] return ho jaara
		try {
			let visSet = new Set();
			let ans = []; // Array to store approval lists

			await data.sort(async (ele, ele1) => {
				let keyA = new Date(ele.timestamp),
					keyB = new Date(ele1.timestamp);

				if (keyA < keyB) return -1;

				if (keyA > keyB) return 1;

				return 0;
			});

			for (let i = data.length - 1; i >= 0; i--) {
				if (visSet.has(data[i].email) == true) continue;

				if (email == data[i].email) ans.push(data[i]);

				visSet.add(data[i].email);
			}

			ans.filter(async ele => ele.email == email);

			let id = await userModel.findOne({ email: email });

			if (ans && ans.length) {
				ans[0].id = !id || id == null ? "default" : id._id;
			}

			return { success: true, message: ans };
		} catch (err) {
			return { success: false, message: err };
		}
	};

	// For checking the status of pending reject or approved KYC's
	checkKycStatus = async (data, email) => {
		// [ { user: email, bank: BankA , status: "pending" }]
		// Cope and Seethe

		try {
			let visSet = new Set();
			let ans = []; // Array to store approval lists

			await data.sort(async (ele, ele1) => {
				let keyA = new Date(ele.timestamp),
					keyB = new Date(ele1.timestamp);

				if (keyA < keyB) return -1;

				if (keyA > keyB) return 1;

				return 0;
			});

			for (let i = data.length - 1; i >= 0; i--) {
				let index = data[i].borrower.indexOf("=");

				let borrower = data[i].borrower.substring(index + 1);

				let lender = data[i].lender.substring(index + 1);

				let x =
					data[i].approval == "true" && lender[0] == "B" ? lender : borrower;
				if (visSet.has(x) == true) continue;

				if (email == data[i].email) {
					//bank has approved			//applied but not approved  --new approval:rejected
					if (
						(data[i].approval == "true" && lender[0] == "B") ||
						(data[i].approval == "false" && lender[0] == "U")
					) {
						ans.push({
							user: email,
							bank:
								data[i].approval == "true" && lender[0] == "B"
									? lender
									: borrower,
							approval: data[i].approval,
						});
					}
				}
				visSet.add(x);
			}

			return { success: true, message: ans };
		} catch (err) {
			return { success: false, message: err.message };
		}
	};

	checkKycStatus2 = async (data, email) => {
		// [ { user: email, bank: BankA , status: "pending" }]
		// Cope and Seethe

		try {
			let visSet = new Set();
			// console.log(data);
			let ans = []; // Array to store approval lists

			await data.sort(async (ele, ele1) => {
				let keyA = new Date(ele.timestamp),
					keyB = new Date(ele1.timestamp);

				if (keyA < keyB) return -1;

				if (keyA > keyB) return 1;

				return 0;
			});

			for (let i = data.length - 1; i >= 0; i--) {
				let index = data[i].borrower.indexOf("=");

				let borrower = data[i].borrower.substring(index + 1);

				let lender = data[i].lender.substring(index + 1);
				// let x =
				// 	data[i].approval == "true" && lender[0] == "B" ? lender : borrower;
				let c =
					data[i].approval == "false" && lender[0] == "U" ? borrower : lender;
				if (visSet.has(JSON.stringify({ email, c })) == true) continue;

				if (email == data[i].email) {
					//bank has approved			//applied but not approved  --new approval:rejected
					if (
						(data[i].approval == "true" && lender[0] == "B") ||
						(data[i].approval == "false" && lender[0] == "U") ||
						(data[i].approval == "request" && lender[0] == "B") ||
						(data[i].approval == "reject" && lender[0] == "B")
					) {
						ans.push({
							user: email,
							bank: c,
							approval: data[i].approval,
						});

						visSet.add(JSON.stringify({ email, c }));
					}
				}
				// visSet.add(x);
			}
			return { success: true, message: ans };
		} catch (err) {
			return { success: false, message: err.message };
		}
	};
}

module.exports = exports = new User();
