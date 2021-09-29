const express = require("express");
require("./database/db");
require("dotenv").config();
var cors = require('cors')
const app = express();
app.use(cors())
const userRouter = require("./routes/userRoute").router;
const bankRouter = require("./routes/bankRoute").router;
const utilRouter = require("./routes/utilRoute").router;

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/bank", bankRouter);
app.use("/util", utilRouter);

app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});
