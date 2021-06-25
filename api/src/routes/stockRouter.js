const server = require("express").Router();


const {editStock,getAllStock,postStock,getStockByLote,deleteStock} = require('../controllers/stockController')


server.get("/",getAllStock);
server.get("/lote/:id",getStockByLote)
server.post("/create",postStock);
server.put("/edit",editStock);
server.delete("/delete/:id", deleteStock)
module.exports = server;