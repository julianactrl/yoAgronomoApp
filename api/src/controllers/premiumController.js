const { User } = require("../db");
const { FRONT, BACK, BACK_URL, ACCESS_TOKEN_PROD } = process.env;
const mercadopago = require("mercadopago");
const { mailCompleted } = require("../mails/mensaje");

//Cuenta a la que hacemos referencia como vendedor
mercadopago.configure({
  access_token: ACCESS_TOKEN_PROD,
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
            success: `${BACK_URL}/premium/mercadoPagoRedirect`,
            failure: `${BACK_URL}/premium/mercadoPagoRedirect`,
            pending: `${BACK_URL}/premium/mercadoPagoRedirect`,
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
        // mailCompleted(user);
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

//server.post('/mercadoPagoNotifications',
const mercadoPagoNotifications = async (req, res) => {
  res.sendStatus(200);
  console.log("mercadoPagoNotifications", req.query);
  console.log("mercadoPagoNotifications", req.body);
  console.log("mercadoPagoNotifications", req.query.type);
  try {
    if (req.query.type === "payment") {
      const payment = await mercadopago.payment.get(req.query["data.id"]);
      console.log("pyment mercadoPagoNotifications", payment);
      console.log("payment body status", payment.body.status);
      switch (payment.body.status) {
        /**************************CASO REJECTED*******************************/
        case "rejected": {
          console.log("rejected");
          const merchant = await mercadopago.merchant_orders.get(
            payment.body.order.id
          );
          console.log("MERCHANT", merchant);
          const user = await User.findOne({
            where: { mp_id: merchant.body["preference_id"] },
          });
          //cancelled
          const updatedUser = await user.update({
            order_status: "cancelled",
            payment_link: null,
          });

          return console.log(
            "ORDER ACTUALIZADA A CANCELADA-->",
            JSON.stringify(updatedUser, undefined, 4)
          );
        }

        /**************************CASO APPROVED*******************************/
        case "approved": {
          console.log("approved");

          const merchant = await mercadopago.merchant_orders.get(
            payment.body.order.id
          );
          console.log("MERCHANT", merchant);

          const order = await User.findOne({
            where: { mp_id: merchant.body["preference_id"] },
          });
          //con otro medio de pago y es aceptado
          const updatedUser = await user.update({
            order_status: "completed",
            payment_link: null,
            isPremium: true,
          });

          return console.log(
            "ORDER ACTUALIZADA A COMPLETADA-->",
            JSON.stringify(updatedUser, undefined, 4),
            /**AQUI VA ENVIO DE CORREO */
            mailCompleted(updatedUser)
          );
        }
        /**************************CASO FAILURE*******************************/
        case "failure": {
          console.log("failure");
          console.log("MERCHANT", merchant);

          const merchant = await mercadopago.merchant_orders.get(
            payment.body.order.id
          );
          const user = await User.findOne({
            where: { mp_id: merchant.body["preference_id"] },
          });
          const updatedUser = await user.update({
            order_status: "cancelled",
            payment_link: null,
            isPremium: false,
          });
          return console.log(
            "ORDER ACTUALIZADA A CANCELLED-->",
            JSON.stringify(updatedUser, undefined, 4)
          );
        }
        /**************************CASO PENDING*******************************/
        case "pending": {
          //este caso es pendiente de pago
          console.log("pending");

          const merchant = await mercadopago.merchant_orders.get(
            payment.body.order.id
          );
          console.log("MERCHANT", merchant);
          const user = await User.findOne({
            where: { mp_id: merchant.body["preference_id"] },
          });
          const updatedUser = await user.update({
            order_status: "processing",
            isPremium: false,
          });
          return console.log(
            "ORDER ACTUALIZADA A PROCESSING-->",
            JSON.stringify(updatedUser, undefined, 4)
          );
        }
        case "in_process": {
          //este caso es pendiente de pago
          console.log("in_process");
          const merchant = await mercadopago.merchant_orders.get(
            payment.body.order.id
          );
          console.log("MERCHANT", merchant);

          const user = await User.findOne({
            where: { mp_id: merchant.body["preference_id"] },
          });
          const updatedUser = await user.update({
            order_status: "processing",
            isPremium: false,
          });
          return console.log(
            "ORDER ACTUALIZADA A PROCESSING-->",
            JSON.stringify(updatedUser, undefined, 4)
          );
        }
      }
    }
  } catch (err) {
    console.log("error ", err);
  }
};

//server.get('/mercadoPagoRedirect',
const mercadoPagoRedirect = async (req, res) => {
  try {
    //console.info("En la ruta de mercadoPagoRedirect", req)

    const payment_id = req.query.payment_id;
    const payment_status = req.query.status;

    console.log("REQ mercadoPagoRedirect", req.query);

    //console.log('Payment Status mercadoPagoRedirect', payment_status);
    const user = await User.findOne({
      where: {
        mp_id: req.query["preference_id"],
      },
    });
    console.log("ORDER mercadoPagoRedirect", user);
    switch (user.order_status || user.order_status === null) {
      case "completed": {
        //al home
        return res.redirect(`${FRONT}/home`);
      }
      case "processing": {
        //home
        return res.redirect(`${FRONT}/home`);
      }
      case "canceled": {
        //al home
        return res.redirect(`${FRONT}/home`);
      }
      default:
        //al home
        return res.redirect(`${FRONT}/home`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  premium,
  mercadoPagoNotifications,
  mercadoPagoRedirect,
};
