const server = require("express").Router();

const upload = require('./../libs/storage');


const {
    getAllClasificiones,
    createClasificacion,
    deleteClasificacion,
    ///// GASTOS //////
    getGastosByInput,
    createGasto,
    deleteGasto,
    updateGasto,
    getAllGastos,
    ///// TOTAL /////
    getTotal
} = require("../controllers/gastosController");

/////////////////////   CLASIFICACIONES   ///////////////////////////////
 
server.post("/createClasificacion", createClasificacion)
server.get("/clasificacion/:id", getAllClasificiones)
server.delete("/deleteClasificacion/:id", deleteClasificacion)

/////////////// GASTOS  /////////////////////////////////
server.get('/getGastoByInput/:input', getGastosByInput)
server.get('/getGasto/:id', getAllGastos)
server.post("/createGasto", createGasto)
server.delete('/deleteGasto/:id', deleteGasto)
server.put("/updateGasto/:id",updateGasto)

///////////////// TOTAL ///////////////

server.get('/getTotal/:empresaId', getTotal)

module.exports = server;