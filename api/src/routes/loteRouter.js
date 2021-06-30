const server = require("express").Router();

const upload = require('./../libs/storage');


const {
  deleteManejo,
  getAllManejo,updateManejo,
  createManejo,
  getAllLotes,
  getLoteByName,
  getLoteById,
  deleteLote,
  createLote,
  updateLote,
  getImageLote,
  getImageManejoLote,
 
} = require("../controllers/loteController");

//////////////////////////////////////////////////////

server.post('/create', upload.single("imagen"), createLote)
server.get('/imagen/:name', getImageLote)

server.post("/createManejo/:loteId",upload.single("image"), createManejo)
server.get('/image/:name', getImageManejoLote)




///////////////////////////////////////////////////
server.get("/empresa/:id", getAllLotes);
server.get("/:id", getLoteById);
server.get("/name", getLoteByName);
server.delete("/delete/:id",deleteLote);
server.put("/:id", updateLote);


/////// MANEJO DE LOTE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

server.get("/manejos/:id", getAllManejo)
server.put('/updateManejo/:id', updateManejo)
server.delete("/deleteManejo/:id",deleteManejo)



module.exports = server;

