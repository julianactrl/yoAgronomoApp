const { Post, Empresa } = require('../db');

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

module.exports = {

  getEmpresaByUserId,
};
