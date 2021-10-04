isBank = async (req, res, next) => {
	if (req.body.role == 2) {
		return next();
	}

	res.send({
		success: false,
		message: "You are not authorized for this request",
	});
};

isUser = async (req, res, next) => {
	if (req.body.role == 1) {
		return next();
	}

	res.send({
		success: false,
		message: "You are not authorized for this request",
	});
};

module.exports = exports = {
	isBank,
};
