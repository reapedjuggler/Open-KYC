const bcrypt = require("bcryptjs");
require("dotenv").config();

class UtilService {
	constructor() {}

	findByEmail = async (email, model) => {
		const user = await model.findOne({ email: email });
		if(user==undefined ||user==null ||Object.keys(user).length == 0){
			return {}
		}	
		return user
	};

	findById = async (userId, model) => {
		const user = await model.findOne({ _id: userId });
		if(user==undefined ||user==null ||Object.keys(user).length == 0){
			return {}
		}	
		return user
	};

	findByCredentials = async (email, password, model) => {
		const user = await this.findByEmail(email, model);
		

		if(user==undefined ||user==null ||Object.keys(user).length == 0){
			return {}
		}	
		return user
	};

	hashUtil = async password => {
		const salt = await bcrypt.genSalt(parseInt(process.env.saltRounds));
		const hashedPassword = await bcrypt.hash(password, salt);

		return hashedPassword;
	};
}
module.exports = exports = new UtilService();
