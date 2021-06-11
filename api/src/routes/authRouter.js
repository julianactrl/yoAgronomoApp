const server = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middleware/customMiddleware");

//---------------------------------------------------------------//
const { login, register, myProfile } = require("../controllers/authController");

//-------------------------Route Users--------------------------//

server.post("/login",  login);
server.post("/register",  register);
server.get('/myProfile', myProfile)

module.exports = server;
