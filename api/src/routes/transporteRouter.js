const server = require("express").Router();

const {
    deleteTransporte, getAllTransportes, createTransporte, updateTransporte, getTransporteById
     } = require("../controllers/transporteController")

     server.get("/get/:id", getAllTransportes)
     server.get("/getone/:id", getTransporteById)
     server.delete("/delete/:id", deleteTransporte)
     server.post("/create", createTransporte)
     server.put("/update/:id", updateTransporte)


     module.exports = server;