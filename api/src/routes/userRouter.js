const server = require("express").Router();
// const { 
//     isAuthenticated
// } = require("../middleware/customMiddleware");
const upload = require('./../libs/storage');
//---------------------------------------------------------------//
const { 
    getUserAll, 
    getUserById,
    editUser,
    deleteUser,
    getEmpresaByUserId,
    updateUser

} = require("../controllers/userController");

// const {isAuthenticated} = require("../auth");

//-------------------------Route Users--------------------------//

// server.get("/", getUserAll);
// server.get("/:id", getUserById);
server.patch('/edit/:id', upload.single("profile_pic"), updateUser)
server.delete('/delete/:id', deleteUser)
// server.get('/empresa/:userId', getEmpresaByUserId)


module.exports = server;
