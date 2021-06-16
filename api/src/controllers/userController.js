const { User, Empresa } = require("../db");

const getUserAll = async(req, res, next) => {
  try {
    if (req.user) {
      const result = await User.findAll();
      res.send(result);
    } else {
      res.status(401).json({ message: "No hay usuarios" });
    }
  } catch (error) {
    next(error);
  }
};

//==================================================//
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await User.findByPk(id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
//==================================================//
const editUser = (req, res, next) => {
  const { id } = req.params;

  const { email, password, fullName, googleId, profile_pic } = req.body;

  User.update(
    {
      email,
      password,
      fullName,
      googleId,
      profile_pic
    },
    {
      where: {
        id: id,
      },
    }
  ).then((modified) => {
    console.log(modified);
    if (modified[0] === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario modificado con exito" });
  });
};

//==================================================//
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: {
        id: id,
      },
    });
    res.status(202).json({ message: "Cuenta Eliminada con Exito" });
  } catch (error) {
    next(error);
  }
};

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
  getUserAll,
  getUserById,
  editUser,
  deleteUser,
  getEmpresaByUserId,
};
