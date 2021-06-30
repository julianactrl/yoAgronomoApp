const server = require("express").Router();

const upload = require('./../libs/storage');


const {
    getAllClasificiones,
    createClasificacion,
    deleteClasificacion,
    ///// GASTOS //////
    createGasto,
    deleteGasto,
    updateGasto,
    getAllGastos
} = require("../controllers/gastosController");

/////////////////////   CLASIFICACIONES   ///////////////////////////////
 
server.post("/createClasificacion", createClasificacion)
server.get("/clasificacion/:id", getAllClasificiones)
server.delete("/deleteClasificacion/:id", deleteClasificacion)

/////////////// GASTOS  /////////////////////////////////

server.get('/getGasto/:id', getAllGastos)
server.post("/createGasto", createGasto)
server.delete('/deleteGasto/:id', deleteGasto)
server.put("/updateGasto/:id",updateGasto)

module.exports = server;