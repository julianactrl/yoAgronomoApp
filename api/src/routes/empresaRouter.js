const server = require("express").Router();

const upload = require('./../libs/storage');


const {
  createEmpresa,
  deleteEmpresa,
  getAllEmpresas,
  getEmpresaById,
  getEmpresaByName,
  updateEmpresa,
  getAllEmpresasByUser,
  getImageEmpresa
} = require("../controllers/empresaController");
/////////////////////////////////////////////////////////

server.post('/create', upload.single("imagen"), createEmpresa)
server.get('/imagen/:name', getImageEmpresa)

/////////////////////////////////////////////
server.delete("/delete/:id", deleteEmpresa);
server.get("/", getAllEmpresas);
server.get("/:id", getEmpresaById);
server.get("/nombreEmpresa", getEmpresaByName);
server.put("/:id", updateEmpresa);
server.get("/user/:id",getAllEmpresasByUser)
////////////////////////////////////////////


module.exports = server;
