const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { EMAIL_ACCOUNT, EMAIL_PASSWORD } = process.env;

const sendMail = (options) => {
	console.log("ESTOY EN NODEMAILER INDEX SOY OPTIONS", options)
	let transporter = nodemailer.createTransport(smtpTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		auth: {
			user: EMAIL_ACCOUNT,
			pass: EMAIL_PASSWORD
		}
	}));

	transporter.sendMail(options, function (error, info) {
		if (error) {
			return ({ status: 400, message: "Mail could not be sent" })
		} else {
			return ({ status: 200, message: "Code sent", ok: true })
		}
	});
	
}

module.exports = { sendMail }