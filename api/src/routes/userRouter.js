const server = require("express").Router();
const { 
    isAuthenticated, 
    isAdmin 
} = require("../middleware/customMiddleware");

//---------------------------------------------------------------//
const { 
    getUserAll, 
    getUserById,
    editUser,
    deleteUser,
    getEmpresaByUserId
} = require("../controllers/userController");

//-------------------------Route Users--------------------------//

server.get("/", getUserAll);
server.get("/:id", getUserById);
server.put('/edit/:id', isAuthenticated, editUser)
server.delete('/delete/:id', isAuthenticated, deleteUser)
server.get('/empresa/:userId', getEmpresaByUserId)


module.exports = server;
