const { Router } = require('express');
const router = Router();
const { Empresa } = require('../db')
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const nameEmpresa = req.query.name.toLocaleLowerCase()
  // const {nameEmpresa} = req.params
      try {
        let empresaOk = await Empresa.findAll({
          where: {
            Nombre: {
              [Op.iLike]: `%${nameEmpresa}%`
            }
          }
        });
        if(!empresaOk){
        res.send('empresa no encontrada')
        }
  return res.json(empresaOk)

      }catch(err){
        console.log(err)
      }
      })

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

  router.get('/:id', async (req, res) =>{
    const {id} = req.params
    const empresa = await Empresa.findOne({ where: { id: id } })
    if (!empresa) {
        res.send('empresa no encontrada')
    }
     return res.json(empresa)
  });


module.exports = router;
