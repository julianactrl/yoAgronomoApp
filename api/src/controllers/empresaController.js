const { Empresa, User } = require("../db");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");

const getEmpresaByName = async (req, res, next) => {
  const nameEmpresa = req.query.name.toLocaleLowerCase();
  try {
    let empresaOk = await Empresa.findAll({
      where: {
        Nombre: {
          [Op.iLike]: `%${nameEmpresa}%`,
        },
      },
    });
    if (!empresaOk) {
      res.send("empresa no encontrada");
    }
    return res.json(empresaOk);
  } catch (err) {
    console.log(err);
    res.status(500).send(next);
  }
};

const getAllEmpresas = async (req, res, next) => {
  try {
    const empresa = await Empresa.count();
    if (empresa !== 0) {
      res.status(201).json(await Empresa.findAll());
    }
  } catch (e) {
    res.status(404).send(next);
  }
};
const getAllEmpresasByUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const empresa = await Empresa.count();
    if (empresa !== 0) {
      res.status(201).json(
        await Empresa.findAll({
          include: {
            model: User,
            where: {
              id,
            },
          },
        })
      );
    }
  } catch (e) {
    res.status(404).send(next);
  }
};

const getEmpresaById = async (req, res) => {
  const { id } = req.params;
  const empresa = await Empresa.findByPk(id);
  const empresadb = {
    id: empresa.id,
    name: empresa.name,
    hectareas: empresa.hectareas,
    ubicacion: empresa.ubicacion,
    imagen: empresa.imagen,
  };
  if (!empresa) {
    res.send("empresa no encontrada");
  }
  return res.json(empresadb);
};

const createEmpresa = async (req, res, next) => {
  const { name, hectareas, ubicacion, userId} = req.body;
    if (req.file) {
      var empresa = req.file.filename;
    }
  try {
    var cantidad = await Empresa.count({
      where: {
        userId: userId 
      }
    })
    // console.log(cantidad)
    var user = await User.findByPk(userId);

      if(cantidad >= 2 && user.isPremium === false ){
      return res.status(500).send("Debe hacerce premium")
      }
    await Empresa.create({
      name,
      hectareas,
      ubicacion,
      userId,
      imagen: empresa,
    });
   return res.json("fue  creada con exito");
  } catch (error) {
    console.log(error);
    res.status(500).send(next);
  }
};

const deleteEmpresa = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Empresa.destroy({
      where: {
        id,
      },
    });
    res.json({ message: "empresa eliminada" });
  } catch (e) {
    res.status(500).send(next);
  }
};

const updateEmpresa = async (req, res, next) => {
  const { id } = req.params;
  const { name, hectareas, ubicacion } = req.body

  let empresaFind = await Empresa.findAll({where: {id:id}})

  if (req.file) {
    var empresa = req.file.filename;
  } 

  if (empresaFind.length > 0) {
    empresaFind.map(async emp => {
        await emp.update({
          name,
          hectareas,
          ubicacion,
          imagen: empresa
        });
    });
    return res.json({
        message: "Empresa updated",
        date: empresaFind
    })
}



  try {
    await Empresa.update(req.body, {
      where: {
        id,
      },
    });
    res.status(200).json({ message: "empresa modificada" });
  } catch (e) {
    res.status(400).send(next);
  }
};

////////////////////////////////////////////////////////////

const getImageEmpresa = (req, res) => {
  let getImage;
  const { name } = req.params;
  let pathImage = path.join(__dirname, "../");
  // console.log("soy el path ",pathImage)
  try {
    getImage = fs.readFileSync(`${pathImage}uploads/${name}`);
  } catch (error) {
    getImage = fs.readFileSync(`${pathImage}uploads/noImage.png`);
  }
  res.set({ "Content-Type": "image/png" });
  res.send(getImage);
};
////////////////////////////////

module.exports = {
  createEmpresa,
  deleteEmpresa,
  getEmpresaByName,
  getEmpresaById,
  getAllEmpresas,
  updateEmpresa,
  getAllEmpresasByUser,
  getImageEmpresa,
};
