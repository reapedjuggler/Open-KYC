const bcrypt = require("bcryptjs");
const axios = require("axios");

//Models
const bankModel = require("../models/bankModel");
const userModel = require("../models/userModel");

const customError = require("../utils/customError");

// constants
let url = "http://localhost:50006/create-iou";
class Token {
	createToken = async data => {
		try {
			let url = `http://localhost:${data.port}/create-iou`;

			const params = new URLSearchParams();
			params.append("email", data.email);
			params.append("timestamp", "date");
			params.append("type_of_transaction", data.typeOfTransaction);
			params.append("bank", data.bank);

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

			return { success: true, data: resp };
		} catch (err) {
			return { success: false, message: err.message };
		}
	};
}

module.exports = exports = new Token();
