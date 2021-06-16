const server = require("express").Router();

const {
  deleteManejo,getManejo,updateManejo,createManejo,getAllLotes,getLoteByName,getLoteById,deleteLote,createLote,updateLote
} = require("../controllers/loteController");


server.get("/empresa/:id", getAllLotes)
server.get("/:id", getLoteById)
server.get("/name", getLoteByName)
server.delete("/delete/:id",deleteLote)
server.post("/create",createLote)
server.put("/:id", updateLote);

/////// MANEJO DE LOTE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// server.get("/:id/manejo", getManejo)
// server.post("/:id/createManejo", createManejo)
// server.put('/:id/updateManejo', updateManejo)
// server.delete("/:id/deleteManejo",deleteManejo)



module.exports = server;