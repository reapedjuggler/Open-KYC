const bcrypt = require("bcryptjs");
const customError = require("../utils/customError");

// Models
const UserModel = require("../models/userModel");

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
			var val = data.bank;
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

	getPartyNameFromCorda = async data => {
		try {
			let val = data == "A" ? 50033 : 50006;
			let url = `http://localhost:${val}/me`;

			const resp = await axios({ method: "GET", url: url });
			// console.log("Iam the data\n", resp.data);
			return { success: true, message: resp.data };
		} catch (err) {
			return { success: false, message: err.message };
		}
	};

	getUserDatafromCorda = async data => {
		try {
			let val = data == "A" ? 50033 : 50006;
			var url = `http://localhost:${val}/ious`;

			let resp = await axios({ method: "GET", url: url });
			return { success: true, data: resp };
		} catch (err) {
			console.log(err, "\n Iam error in senduserDataToCorda service");
			return { success: false, message: err };
		}
	};
}

module.exports = exports = new User();
