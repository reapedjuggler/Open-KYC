const nodemailer = require("nodemailer");
require("dotenv").config();

const mailService = async (receivers, sender) => {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing

	try {
		let testAccount = {
			user: process.env.user,
			pass: process.env.password,
			// user: "e5tn6exfkn22rlv3@ethereal.email",
			srtp: { host: "smtp.ethereal.email", port: 587, secure: false },
			imap: { host: "imap.ethereal.email", port: 993, secure: true },
			pop3: { host: "pop3.ethereal.email", port: 995, secure: true },
			web: "https://ethereal.email",
		};

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: testAccount.user, // generated ethereal user
				pass: testAccount.pass, // generated ethereal password
			},
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: '"Reaped Juggler 👻" <dedrick.labadie90@ethereal.email>', // sender address
			to: "dedrick.labadie@ethereal.com, tomarvibhav@yahoo.in", // list of receivers
			subject: "Hello ✔", // Subject line
			text: "Hello world?", // plain text body
			html: "<b>Hello world?</b>", // html body
		});

		console.log("Message sent: %s", info.messageId);

		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = exports = {
	mailService,
};
