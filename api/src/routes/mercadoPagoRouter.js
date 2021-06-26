// const router = require("express").Router();
// require('dotenv')
// const { FRONT, BACK, TOKEN_TEST} = process.env
// var mercadopago = require("mercadopago");
// mercadopago.configure({
//   access_token: TOKEN_TEST,
// });

// router.post("/", async (req, res) => {
//   const { totalPrice, title } = req.body;
//   var preference = {
//     items: [
//       {
//         title: title,
//         quantity: 1,
//         unit_price: parseInt(totalPrice),
//       },
//     ],
//     back_urls: {
//       success: `${FRONT}`,
//       failure: `${BACK}`,
//       pending: `${BACK}`,
//     },
//     auto_return: "approved",
//   };

//   const link = await mercadopago.preferences.create(preference);
//   res.json({ url: link.body.init_point });
// });

// module.exports = router;