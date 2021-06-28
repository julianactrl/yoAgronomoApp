const { sendMail } = require("./index.js");
const path = require("path");

const mailCompleted = async (data) => {
  console.log("user id y mail ", data.id, data.email)
  const msj = {
    subject: "Order is being processed Nro",
    appreciate: "Thank you for choosing us!",
    text: "If you can not see the link, click below",
    slogan: "Cool",
  };

  let mailOptions = {
    from: '"Yo Agronomo" <yoagronomoapp@gmail.com>',
    to: data.email,
    subject: `${msj.subject} ${data.id}`,
    html: `${msj.appreciate}
            ${msj.text} ${msj.slogan}`,
  };

  await sendMail(mailOptions)
};

module.exports = { mailCompleted };
