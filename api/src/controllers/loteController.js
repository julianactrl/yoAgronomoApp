const {Lote, Empresa, ManejoDeLote} = require("../db");
const { Op } = require("sequelize");

const getAllLotes = async (req,res,next) => {
    const {id} = req.params
    try {
        const empresa = await Lote.count();
        if (empresa !== 0) {
          res.status(201).json(await Lote.findAll({
              include: {
                  model: Empresa,
                  where :{
                      id
                  }
              }
          }));
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
        if  (!lote) {
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
    const { name, superficie, ubicacion, imagen,empresaId} = req.body;

    try{
        let newLote = await Lote.create({
            name,
            superficie,
            ubicacion,
            imagen,
            empresaId
        }, {
            fields: ['name', 'superficie', 'ubicacion', 'imagen','empresaId']
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////// MANEJO DE LOTE/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const createManejo = async (req,res,next) => {
    const { loteId } = req.params
    const { observaciones,recomendaciones, image } = req.body;
    try{
        await ManejoDeLote.create({
            observaciones,
            recomendaciones,
            image,
            loteId
        })
        res.status(200).json("fue creado con exito");
    } catch (error) {
      console.log(error);
      res.status(500).send(next);
    }
  };




  const updateManejo = async(req,res,next) => {
    const { id } = req.params;
    const { observaciones,recomendaciones, description, image } = req.body;

    let ManejoFind = await ManejoDeLote.findAll({
        where: {
            id
        }
    })
    if (ManejoFind.length > 0) {
        ManejoFind.map(async ManejoDeLote => {
            await ManejoDeLote.update({
                observaciones,
                recomendaciones,
                description,
                image,
            });
        });
        return res.json({
            message: "Manejo updated",
        })
    }
}

const getAllManejo = async (req,res,next) => {
    const {id} = req.params
    try {
        const Manejo = await ManejoDeLote.count();
        if (Manejo !== 0) {
          res.status(201).json(await ManejoDeLote.findAll({
              include: {
                  model: Lote,
                  where :{
                      id
                  }
              }
          }));
        }
      } catch (e) {
        res.status(404).send(next);
      }
}
  const deleteManejo = async (req, res, next) => {
    try {
      const { id } = req.params;
      await ManejoDeLote.destroy({
        where: {
          id,
        },
      });
      res.json({ message: "Manejo Eliminado" });
    } catch (e) {
      res.status(500).send(next);
    }
  };
  

module.exports = {
    getAllLotes,
    getLoteByName,
    getLoteById,
    deleteLote,
    createLote,
    updateLote,
    createManejo,
    updateManejo,
    getAllManejo,
    deleteManejo,
  }
