const router = require("express").Router();
var mercadopago = require("mercadopago");
mercadopago.configure({
  access_token:
    "TEST-346511861689288-061816-7233883f42f99cadf084221a3eea9f22-232468002",
});

router.post("/", async (req, res) => {
  const { totalPrice, title } = req.body;
  var preference = {
    items: [
      {
        title: title,
        quantity: 1,
        unit_price: parseInt(totalPrice),
      },
    ],
    back_urls: {
      success: "http://localhost:3000/weather",
      failure: "http://localhost:3001/",
      pending: "http://localhost:3001/",
    },
    auto_return: "approved",
  };

  const link = await mercadopago.preferences.create(preference);
  res.json({ url: link.body.init_point });
});

module.exports = router;