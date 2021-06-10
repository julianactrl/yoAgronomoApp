const { Router } = require('express');
const router = Router();
const { Empresa } = require('../db')

router.delete('/:id', async (req, res) => {
    const {id} = req.params
   await Empresa.destroy({
      where:{
        id
      }
    })
    res.json({messag: 'empresa eliminada'})
  })


module.exports = router;
