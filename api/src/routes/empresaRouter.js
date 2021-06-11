const server = require("express").Router();

const {
  createEmpresa,
  deleteEmpresa,
  getAllEmpresas,
  getEmpresaById,
  getEmpresaByName,
} = require("../controllers/empresaController");

server.post("/create", createEmpresa);
server.delete("/delete/:id", deleteEmpresa);
server.get("/", getAllEmpresas);
server.get("/:id", getEmpresaById);
server.get("/nombreEmpresa", getEmpresaByName);

module.exports = server;
