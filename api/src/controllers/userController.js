const { Post, Empresa,User } = require('../db');
const bcrypt = require('bcrypt');
const authConfig = require('../config');
const path = require("path");
const fs = require("fs");


//==================================================//

const getEmpresaByUserId = (req, res) => {
  const { userId } = req.params;
  Order.findAll({
    where: {
      id: userId,
    },
    include: [
      {
        model: Empresa,
      },
    ],
  })
    .then((empresa) => {
      console.log(" estoy aqui--------", empresa);
      res.json({ message: "Empresa encontrada" }).status(200);
    })
    .catch((err) => {
      res.send({ message: err }).status(400);
    });
};
const updateUser = async(req,res) => {
  const { id } = req.params;
  console.log("SOY EL ID DE UPDATE",id)
  const { fullName, email } = req.body;  
 
  //let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

  let userFind = await User.findAll({where: {id:id}})
  console.log(userFind)
   
  if (req.file) {
    var profile = req.file.filename;
    console.log(profile)
  } 

  if (userFind.length > 0) {
      userFind.map(async user => {
          await user.update({
              fullName,
              email,
              profile_pic: profile
          });
      });
      return res.json({
          message: "User updated",
          date: userFind
      })
  }
}

const getImageProfile = (req, res) => {
  let getImage;
  const { name } = req.params;
  let pathImage = path.join(__dirname, "../");
  // console.log("soy el path ",pathImage)
  try {
    getImage = fs.readFileSync(`${pathImage}uploads\\${name}`);
  } catch (error) {
    getImage = fs.readFileSync(`${pathImage}uploads\\noImage.png`);
  }
  res.set({ "Content-Type": "image/png" });
  res.send(getImage);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((deleteUser) => deleteUser.destroy())
    .then((deleteUser) => res.send("Usuario eliminado con exito"))
    .catch((err) => res.send(err));
};

module.exports = {

  getEmpresaByUserId,
  updateUser,
  deleteUser,
  getImageProfile
};
