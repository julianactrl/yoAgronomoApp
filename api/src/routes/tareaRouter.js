const server = require("express").Router();

const {
    
    createTarea,
    deleteTarea,
    updateTarea,
    getAllTareasByEmpresa
  } = require("../controllers/tareaController");


server.post('/create', createTarea);
server.delete("/delete/:id", deleteTarea);
server.put("/:id", updateTarea);
server.get("/empresa/:id", getAllTareasByEmpresa)

module.exports = server;