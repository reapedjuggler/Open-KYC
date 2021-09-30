const mongoose = require("mongoose");
require("dotenv").config();

const db = mongoose.connection;

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.once("open", () => {
  console.log("database is connected");
});

module.exports = mongoose;