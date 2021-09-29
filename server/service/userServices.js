const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModel");
const customError = require("../utils/customError");

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
			// http://localhost:50006/create-iou?iouValue=89&partyName=<partyName>&aadhar=<aadhar>&pan=<pan>&email=<email>

			// url =
			// 	url +
			// 	`partyName=${data.bank}&aadhar=${data.adharNo}&pan=${data.pan}&email=${data.email}`;

			url = `http://localhost:${data.bank}/create-iou`;

			const params = new URLSearchParams();
			params.append("email", data.email);
			params.append("pan", data.pan);
			params.append("aadhar", data.aadhar);
			params.append("approval", "false");

			params.append("partyName", data.partyName);
			params.append("iouValue", 17);
			const config = {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			};

			// console.log(url, "  \n", params);

			const resp = await axios.post(url, params, config);

			return { success: true, data: resp };
		} catch (err) {
			return { sucess: false, message: "Problem in sending data" };
		}
	};

	getPartyNameFromCorda = async data => {
		try {
			let url = `http://localhost:${data}/me`;

			const resp = axios.get(url);
			return { success: true, message: resp.me };
		} catch (err) {
			return { success: false, message: err.message };
		}
	};

	getUserDatafromCorda = async data => {
		try {
			// append adhar no pan no and email to the url

			// http://localhost:50006/create-iou?iouValue=89&partyName=<partyName>&aadhar=<aadhar>&pan=<pan>&email=<email>

			url =
				url +
				`partyName=${data.bank}&aadhar=${data.adharNo}&pan=${data.pan}&email=${data.email}`;

			let resp = await axios({ method: "GET", url: url });
			return { success: true, data: resp };
		} catch (err) {
			console.log(err, "\n Iam error in senduserDataToCorda service");
			return { success: false, message: err };
		}
	};
}

module.exports = exports = new User();
