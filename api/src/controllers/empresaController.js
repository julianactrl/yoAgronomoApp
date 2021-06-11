const { Empresa } = require("../db");
const { Op } = require("sequelize");

const getEmpresaByName = async (req, res, next) => {
  const nameEmpresa = req.query.name.toLocaleLowerCase();
  // const {nameEmpresa} = req.params
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

const getEmpresaById = async (res, req, next) => {
  try {
    const { id } = req.params;
    const empresa = await Empresa.findOne({ where: { id: id } });
    if (!empresa) {
      res.send("empresa no encontrada");
    }
    return res.json(empresa);
  } catch (err) {
    res.status(500).send(next);
  }
};

const createEmpresa = async (req, res, next) => {
  const { nombre, superficie } = req.body;
  try {
    await Empresa.create({
      nombre,
      superficie,
    });
    res.status(200).json("fue  creada con exito");
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

module.exports = {
  createEmpresa,
  deleteEmpresa,
  getEmpresaByName,
  getEmpresaById,
  getAllEmpresas,
};
