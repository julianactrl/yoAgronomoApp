const { sendMail } = require("./index.js");
const path = require("path");

const mailCompleted = async (data) => {
  console.log(data.id)
  const msj = {
    subject: "Order is being processed Nro",
    appreciate: "Thank you for choosing us!",
    text: "If you can not see the link, click below",
    slogan: "Cool",
  };
  console.log("mensaje --->>", msj.appreciate);
  let mailOptions = {
    from: '"Yo Agronomo" <juliana.mg3@gmail.com>',
    to: data.email,
    subject: `${msj.subject} ${data.id}`,
    html: `<p>Thanks you for choosing us!</p>`,
  };

  await sendMail(mailOptions)
};

module.exports = { mailCompleted };
