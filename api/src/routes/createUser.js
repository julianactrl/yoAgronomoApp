const { Router } = require('express');
const router = Router();
const { User } = require('../db')

  router.post('/', async (req, res) => {
    const { email, password, name, last_name, phone, photoURL } = req.body;
  try{
    User.create({
        email,
        password,
        name,
        last_name,
        phone,
        photoURL,
    })

  }catch(error){
    console.log(error)
    }
  });

module.exports = router;
