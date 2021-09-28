const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModel");
const customError = require("../utils/customError");

// let url = "http://localhost:500011/";
let url = "http://localhost:50006/create-iou?iouValue=89&";
class User {
	createUser = async data => {
		try {
			const user = new UserModel({
				firstName: data.firstname,
				lastName: data.lastname,
				email: data.email,
				password: data.password,
				createdAt: new Date(),
				// 	adharNo: data.adharNo,
				// panNo: data.panNo,
				// 	passportId: data.passportId,
				// 	voterId: data.voterId,
			});

			await user.save();

			return { success: true, message: "Data Saved" };
		} catch (err) {
			console.log(err);
			return { success: false, message: err.message };
		}
	};

	// The main service which interacts with CordA
	sendUserDataToCorda = async data => {
		try {
			// http://localhost:50006/create-iou?iouValue=89&partyName=<partyName>&aadhar=<aadhar>&pan=<pan>&email=<email>

			url =
				url +
				`partyName=${data.bank}&aadhar=${data.adharNo}&pan=${data.pan}&email=${data.email}`;

			return { success: true, data: resp };
		} catch (err) {
			console.log(err, "\n Iam error in senduserDataToCorda service");
			return { success: false, message: err };
		}
	};

	// The main service which interacts with CordA
	getUserDatafromCorda = async data => {
		try {
			// append adhar no pan no and email to the url

			// http://localhost:50006/create-iou?iouValue=89&partyName=<partyName>&aadhar=<aadhar>&pan=<pan>&email=<email>

			url = url + `partyName=${data.bank}&${data.adharNo}&${data.email}`;

			let resp = await axios({ method: "GET", url: url });
			return { success: true, data: resp };
		} catch (err) {
			console.log(err, "\n Iam error in senduserDataToCorda service");
			return { success: false, message: err };
		}
	};
}

module.exports = exports = new User();
