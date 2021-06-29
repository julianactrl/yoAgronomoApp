const server = require("express").Router();
const upload = require('./../libs/storage');
//---------------------------------------------------------------//
const { 
    deleteUser,
    updateUser,  
    getImageProfile

} = require("../controllers/userController");


//-------------------------Route Users--------------------------//


server.patch('/edit/:id', upload.single("profile_pic"), updateUser)
server.delete('/delete/:id', deleteUser)
server.get('/picture/:name', getImageProfile)



module.exports = server;
