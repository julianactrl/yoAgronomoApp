const { Router } = require('express');
const router = Router();
const { Empresa } = require('../db')

  router.post('/empresa', async (req, res) => {
    const { Nombre, Superficie } = req.body;
  try{
    Empresa.create({
        Nombre,
        Superficie,
    })

  }catch(error){
    console.log(error)
    }
  });


  router.get('/empresa/:id', async (req, res) => {
const empresa = getEmpresa(req.param.id);

if(!empresa) return res.status(404).json({})
return res.json(empresa);
 })

 
  router.delete('/empresa', async (req, res) => {
    const username = req.params.userName;

      if(userIndex === -1) return res.status(404).json({})

    User.splice(userIndex, 1);
    res.json(user);
  })

module.exports = router;
