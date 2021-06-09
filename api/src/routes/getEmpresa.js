const { Router } = require('express');
const router = Router();
const { Empresa } = require('../db')


router.get('/', async (req, res) => {
    try {
      const empresa = await Empresa.count();
      if(empresa !== 0) {
         res.status(201).json (await Empresa.findAll());
      }

    }catch (e) {
      res.status(404).send('No hay empresas creadas')
    }
 })

 module.exports = router;