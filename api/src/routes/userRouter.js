const server = require("express").Router();
//---------------------------------------------------------------//
const {
    
    login,
   
} = require("../controllers/userController");

//-------------------------Route Users--------------------------//


server.post('/login', login);


module.exports = server;