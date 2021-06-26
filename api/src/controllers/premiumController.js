const { User } = require("../db");
const { FRONT, BACK, BACK_URL , ACCESS_TOKEN_PROD} = process.env
const mercadopago = require("mercadopago");
const { mailCompleted } = require("../mails/mensaje");

//Cuenta a la que hacemos referencia como vendedor
mercadopago.configure({
  access_token: ACCESS_TOKEN_PROD
});


const premium = async (req, res) => {
  try {
    const { userId } = req.params;
    const { totalPrice, title } = req.body;
    const orderDate = new Date();

    await User.findOne({
      where: {
        id: userId,
      },
    })
      .then(async (user) => {
        //actualizo la user Date con los datos que me llegan por body
        user.update({
          order_date: orderDate,
        });

        let preference = {
          items: [
            {
              title: title,
              quantity: 1,
              unit_price: parseInt(totalPrice),
            },
          ],
          back_urls: {
            success: `${BACK_URL}/api/signin/mercadoPagoRedirect`,
            failure: `${BACK_URL}/api/signin/mercadoPagoRedirect`,
            pending: `${BACK_URL}/api/signin/mercadoPagoRedirect`,
          },
          auto_return: "approved",
          notification_url: `${BACK_URL}/premium/mercadoPagoNotifications`,
        };

        const resp = await mercadopago.preferences.create(preference);
        //actualizo user con los datos de mercado pago
        user.update({
          mp_id: resp.response.id,
          payment_link: resp.body.init_point,
        });
        mailCompleted(user);
        return res.json(user.payment_link);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = {
  premium,
};
