const server = require("express").Router();

const {
  createEmpresa,
  deleteEmpresa,
  getAllEmpresas,
  getEmpresaById,
  getEmpresaByName,
  updateEmpresa,
  getAllEmpresasByUser
} = require("../controllers/empresaController");

server.post("/create", createEmpresa);
server.delete("/delete/:id", deleteEmpresa);
server.get("/", getAllEmpresas);
server.get("/:id", getEmpresaById);
server.get("/nombreEmpresa", getEmpresaByName);
server.put("/:id", updateEmpresa);
server.get("/user/:id",getAllEmpresasByUser)

module.exports = server;
