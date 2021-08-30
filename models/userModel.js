const mongoose = require("mongoose");

const customError = require("../utils/customError");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: Number,
  },
  adharNo: {
    type: String,
  },
  
});

// userSchema.methods.generateAuthToken = async function () {
//   const authToken = jwt.sign(
//     { _id: this._id },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: "1h",
//     }
//   );
//   if (!authToken) throw customError(503, "error creating token");
//   return authToken;
// };

// userSchema.methods.generateRefreshToken = async function () {
//   const refreshToken = jwt.sign(
//     { _id: this._id },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: "24h",
//     }
//   );
//   if (!refreshToken) throw customError(503, "error creating token");

//   return refreshToken;
// };

// userSchema.methods.generateResetPassword = function () {
//   this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
//   this.resetPasswordExpires = Date.now() + 3600000; // expires in an hour
// };

// userSchema.pre("save", function (next) {
//   if (this.isModified("password")) {
//     bcrypt.genSalt(10, (error, salt) => {
//       if (error) return next(customError(503, error.message));
//       return bcrypt.hash(this.password, salt, (err, hash) => {
//         if (err) return next(customError(503, err.message));
//         this.password = hash;
//         return next();
//       });
//     });
//   } else {
//     next();
//   }
// });

module.exports = mongoose.model("user", userSchema);
