const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModel");
const customError = require("../utils/customError");
const axios = require("axios");
// let url = "http://localhost:50006/create-iou?iouValue=89&";
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
			var val = data.bank
			var url = `http://localhost:${val}/create-iou`;
			console.log("lol",typeof url)

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

			console.log("bas data",data)
			//const resp={}
			const resp = await axios.post(url, params, config);
			//const resp=await axios({ method: "POST", params, config });
			console.log(resp)
			return { success: true, data: resp };
		} catch (err) {
			console.log(err)
			return { success: false, message: "Problem in sending data\n"+err };
		}
	};

	getPartyNameFromCorda = async data => {
		try {
			let url = `http://localhost:${data == "A" ? 50033 : 50006}/me`;
			const resp = await axios({ method: "GET", url: url });
			console.log("hat bsdk",(resp.data))
			return { success: true, message: resp.data };
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
