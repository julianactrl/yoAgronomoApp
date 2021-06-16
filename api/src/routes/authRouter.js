const server = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middleware/customMiddleware");

//---------------------------------------------------------------//
const {
  login,
  register,
  myProfile,
  googleAuth,
  google,
 // logout,
} = require("../controllers/authController");

//-------------------------Route Users--------------------------//

server.post("/login", login);
//server.get('/logout', logout)
server.post("/register", register);
server.get("/myProfile",  isAuthenticated,myProfile);
server.get("/google", google);
server.get("/google/callback", googleAuth);

module.exports = server;