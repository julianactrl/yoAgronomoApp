const server = require("express").Router();
const upload = require('./../libs/storage');
//---------------------------------------------------------------//
const { 
    deleteUser,
    updateUser,  
    getImageProfile,
    resetVerificaction,
    passwordReset

} = require("../controllers/userController");


//-------------------------Route Users--------------------------//


server.patch('/edit/:id', upload.single("profile_pic"), updateUser)
server.delete('/delete/:id', deleteUser)
server.get('/picture/:name', getImageProfile)
server.post('/reset/password', passwordReset)
server.post('/reset/verification', resetVerificaction)

module.exports = server;
