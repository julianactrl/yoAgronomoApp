const {Lote} = require("../db");
const { Op } = require("sequelize");

const getAllLotes = async (req,res,next) => {
    try {
        const empresa = await Lote.count();
        if (empresa !== 0) {
          res.status(201).json(await Lote.findAll());
        }
      } catch (e) {
        res.status(404).send(next);
      }
}
const getLoteByName = async (req, res, next) => {
    const { name } = req.params;
    try {
        const lote = await Lote.findAll({
            where: {
                name
            }
        })
        res.json(lote);
    } catch (error) {
        if (!lote) {
            console.log(error)
            return res.json({
                message: "Lote doesnt exist"
            })
        }
    }
  };
const getLoteById = async (req,res,next) => {
    const { id } = req.params;
    try {
        const lote = await Lote.findOne({
            where: {
                id
            }
        })
        res.json(lote)
    } catch (error) {
        if (!lote) {
            return res.json({
                messages: "Not found"
            })
        }
    }
}
const deleteLote = async(req, res,next)=> {
    const { id } = req.params;
    try {
        const deletedLote = await Lote.destroy({
            where: {
                id
            }
        });
        res.json({
            message: "Lote deleted succesfully",
            data: deletedLote
        })
    } catch (error) {
        res.json({
            message: "Delete failed",
            data: {}
        })
    }
}
const createLote = async(req,res,next) => {
    const { name, superficie, ubicacion, imagen} = req.body;

    try{
        let newLote = await Lote.create({
            name,
            superficie,
            ubicacion,
            imagen
        }, {
            fields: ['name', 'superficie', 'ubicacion', 'imagen']
        })
        if (newLote) {
            res.status(200).json({
                message: "Lote created succesfully",
                data: newLote
            })
    }
    }catch(error){
        if(!newLote){
            res.status(400).json({
                message: "Somethings goes wrong"
            })
        }
    }
}
const updateLote = async(req,res,next) => {
    const { id } = req.params;
    const { name, superficie, ubicacion, imagen} = req.body;

    const loteUpdated = await Lote.findAll({
        atributes: ['id', 'name', 'superficie', 'ubicacion', 'imagen'],
        where: {
            id
        }
    })
    if (loteUpdated.length > 0) {
        loteUpdated.map(async lote => {
            await lote.update({
                name,
                superficie,
                ubicacion,
                imagen
            });
        });
        return res.json({
            message: "Lote updated",
            data: loteUpdated
        })
    }
}

module.exports = {
    getAllLotes,
    getLoteByName,
    getLoteById,
    deleteLote,
    createLote,
    updateLote
  }