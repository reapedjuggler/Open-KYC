const express = require("express");

// Database configuration file
require("./database/db");

// Dotenv configuration
require("dotenv").config();

// CORS
app.use(cors());
var cors = require("cors");

const app = express();


const userRouter = require("./routes/userRoute").router;
const bankRouter = require("./routes/bankRoute").router;
const utilRouter = require("./routes/utilRoute").router;
const kycRouter = require("./routes/kyc").router;

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/bank", bankRouter);
app.use("/util", utilRouter);
app.use("/kyc", kycRouter);

app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});
