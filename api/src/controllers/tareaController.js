const {Empresa, Tarea} = require("../db");
const path = require("path");
const fs = require("fs");



const createTarea = async(req, res, next) => {
    const { tarea, fecha, empresaId } = req.body;
    try{
         await Tarea.create({
            tarea,
            fecha,
            empresaId,
        });  res.status(200).json("tarea creada con exito");
    } catch (error) {
      console.log(error);
      res.status(500).send(next);
    }
}

const deleteTarea = async(req, res)=> {
    const { id } = req.params;
    try {
        const deletedTarea = await Tarea.destroy({
            where: {
                id
            }
        });
        res.json({
            message: "Tarea eliminada",
            data: deletedTarea
        })
    } catch (error) {
        res.json({
            message: "Delete failed",
            data: {}
        })
    }
}

const updateTarea = async(req,res,next) => {
    const { id } = req.params;
    const { tarea, fecha } = req.body;

    const tareaUpdated = await Tarea.findAll({
        atributes: ['id', 'tarea', 'fecha'],
        where: {
            id
        }
    })
    if (tareaUpdated.length > 0) {
        tareaUpdated.map(async tarea => {
            await tarea.update({
                tarea,
                fecha,
            });
        });
        return res.json({
            message: "tarea updated",
            data: tareaUpdated
        })
    }
}

const getAllTareasByEmpresa = async (req, res, next) => {
    const {id} = req.params
    try {
        
        
          res.status(200).json (await Tarea.findAll({
              include: {
                  model: Empresa,
                  where :{
                      id:id
                  }
              }
          }));
        
      } catch (e) {
        res.status(404).send(next);
      }
   
  };

module.exports = {
    
    createTarea,
    deleteTarea,
    updateTarea,
    getAllTareasByEmpresa
  }
