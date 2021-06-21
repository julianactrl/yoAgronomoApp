const { Post, Empresa,User } = require('../db');
const bcrypt = require('bcrypt');
const authConfig = require('../config');

// module.exports = {

//     async find(req, res, next) {
//         let post = await Post.findByPk(req.params.id);

//         if (!post) {
//             res.status(404).json({ msg: "El post no encontrado" });
//         } else {
//             req.post = post;
//             next();
//         }
//     },

//     async index(req, res) {
//         let posts = await Post.findAll();

//         res.json(posts);
//     },

//     // Show
//     async show(req, res) {
//         res.json(req.post);
//     },

//     // Update
//     async update(req, res) {

//         req.post.title = req.body.title;
//         req.post.body = req.body.body;

//         req.post.save().then(post => {
//             res.json(post);
//         })

//     },

//     // Delete
//     async delete(req, res) {
//         req.post.destroy().then(post => {
//             res.json({ msg: "El post ha sido eliminado " });
//         })
//     },

// }

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
  const { fullName,email,profile_pic } = req.body;
  let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

  let userFind = await User.findAll({
      where: {
          id
      }
  })
  if (userFind.length > 0) {
      userFind.map(async user => {
          await user.update({
              fullName,
              email,
              password,
              profile_pic
          });
      });
      return res.json({
          message: "User updated",
          date: userFind
      })
  }
}

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
  deleteUser
};
