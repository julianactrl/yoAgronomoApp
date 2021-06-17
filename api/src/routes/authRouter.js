const server = require("express").Router();
const { isAuthenticated } = require("../middleware/customMiddleware");

//---------------------------------------------------------------//
const {
  login,
  register,
  myProfile,
  logout,
} = require("../controllers/authController");

//-------------------------Route Users--------------------------//

server.post("/login", isAuthenticated, login);
server.get("/logout", logout);
server.post("/register", register);
server.get("/myProfile", isAuthenticated, myProfile);

module.exports = server;
