const server = require("express").Router();

const {
  getAllLotes,getLoteByName,getLoteById,deleteLote,createLote,updateLote
} = require("../controllers/loteController");

server.get("/empresa/:id", getAllLotes)
server.get("/:id", getLoteById)
server.get("/name", getLoteByName)
server.delete("/delete/:id",deleteLote)
server.post("/create",createLote)
server.put("/:id", updateLote);

module.exports = server;