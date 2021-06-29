const server = require("express").Router();

const {
  premium,
  mercadoPagoNotifications,
  mercadoPagoRedirect,
} = require("../controllers/premiumController");

// Rutas posts
server.post("/mp/:userId", premium);
server.post("/mercadoPagoNotifications", mercadoPagoNotifications);
server.get("/mercadoPagoRedirect", mercadoPagoRedirect);

module.exports = server;
