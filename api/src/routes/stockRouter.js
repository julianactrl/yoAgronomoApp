const server = require("express").Router();


const {editStock,getAllStock,postStock,getStockByEmpresa,deleteStock} = require('../controllers/stockController')


server.get("/",getAllStock)
server.get("/empresa/:id",getStockByEmpresa)
server.post("/create",postStock)
server.put("/edit/:id",editStock)
server.delete("/delete/:id", deleteStock)
module.exports = server;