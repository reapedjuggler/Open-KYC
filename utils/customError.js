const customError = (code = 503, msg = "something went wrong") => {
  const error = new Error();
  error.statusCode = code;
  error.message = msg;
  return error;
};

module.exports = customError;
