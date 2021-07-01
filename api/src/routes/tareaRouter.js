const server = require("express").Router();

const {
    
    createTarea,
    deleteTarea,
    updateTarea,
    getAllTareasByEmpresa,
    getTareaById
  } = require("../controllers/tareaController");


server.post('/create', createTarea);
server.delete("/delete/:id", deleteTarea);
// server.put("/:id", updateTarea);
server.patch('/:id', updateTarea);
server.get("/:id", getAllTareasByEmpresa)

server.get("/tarea/:id", getTareaById);

module.exports = server;