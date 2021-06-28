const { sendMail } = require("./index.js");
const ejs = require('ejs');
const path = require("path");

const mailPaymentCompleted = async (data) => {
  console.log("user id y mail ", data.id, data.email)
  const msj = {
    subject: "Su pago ha sido completado con exito, Id ",
    appreciate: "Ya podes empezar a disfrutar sin limites de tu cuenta Premium Plus!",
    slogan: "Yo Agronomo App",
  };

  let mailOptions = {
    from: '"Yo Agronomo" <yoagronomoapp@gmail.com>',
    to: data.email,
    subject: `${msj.subject} ${data.id}`,
    html: ejs.renderFile(path.join((__dirname), 'mailPaymentCompleted.ejs'), {
			linkHome: `${FRONT}/home`,
			userId: data.userId,
		})
  };

  await sendMail(mailOptions)
};



const mailPaymentInProcess = async (data) => {
	
	const msj = {
		subject: 'Su pago esta siendo procesado - Id ',
		appreciate: 'Disfruta sin limites tu cuenta Premium Plus!',
		slogan: 'yo Agronomo App'
	};
	let mailOptions = {
		from: '"Yo Agronomo" <yoagronomoapp@gmail.com>',
		to: data.order_email,
		subject: `${msj.subject} ${data.id}`,
		html: ejs.renderFile(path.join((__dirname), 'mailPaymentInProcess.ejs'), {
		 	 payment_link: data.payment_link
		}),
	}
	
	
	await sendMail(mailOptions)
	
}

module.exports = { mailPaymentCompleted, mailPaymentInProcess };
