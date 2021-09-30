const customError = require("./customError");

const handleErrors = (err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ error: err.message || "Internal server error" });
  next();
};

module.exports = handleErrors;
