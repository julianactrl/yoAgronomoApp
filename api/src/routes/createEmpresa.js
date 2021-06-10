const { Router } = require('express');
const router = Router();
const { Empresa } = require('../db')

  router.post('/', async (req, res) => {
    const { Nombre, Superficie } = req.body;
  try{
    Empresa.create({
        Nombre,
        Superficie,
    })

  }catch(error){
    console.log(error)
    }
    res.json('fue  creada con exito')
  });

  




  module.exports = router;



