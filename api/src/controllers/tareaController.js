const {Empresa, Tarea} = require("../db");
const path = require("path");
const fs = require("fs");



const createTarea = async(req, res, next) => {
    const { tarea, fecha, prioridad, empresaId } = req.body;
    try{
         await Tarea.create({
            tarea,
            fecha,
            prioridad,
            empresaId,
        });  res.status(200).json({
            tarea,
            fecha,
            prioridad,
            empresaId
          })
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

// const updateTarea = async(req,res,next) => {
//     const { id } = req.params;
//     const { tarea, fecha } = req.body;

//     const tareaUpdated = await Tarea.findAll({
//         atributes: ['id', 'tarea', 'fecha'],
//         where: {
//             id:id
//         }
//     })
//     if (tareaUpdated.length > 0) {
//         tareaUpdated.map(async tarea => {
//             await tarea.update({
//                 tarea,
//                 fecha,
//             });
//         });
//         return res.json({
//             message: "tarea updated",
//             data: tareaUpdated
//         })
//     }
// }
const updateTarea = async (req, res) => {
 const {id} =req.params;
    const { tarea, fecha, prioridad, estado } = req.body;
    let tareaFind = await Tarea.findAll({where:{id:id}})
    if (tareaFind.length > 0){
      tareaFind.map(async t=> {
        await t.update({
          tarea,
          fecha,
          prioridad,
          estado
        })
      })
       return res.json({
        message: "Tarea updated",
        date: tareaFind
    })
    }
  //   await Tarea.update(req.body, {
  //     where: {
  //       tarea,
  //     },
  //   });
  //   res.status(200).json({ message: "tarea modificada" });
  // } catch (e) {
  //   res.status(400).send(next);
  // }
};




const getAllTareasByEmpresa = async (req, res, next) => {
    const {id} = req.params
    try {
        const tarea = await Tarea.count();
        if (tarea !== 0) {
          res.status(201).json(await Tarea.findAll({
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
   
  };

  const getTareaById = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tarea.findByPk(id);
    const tareadb = {
      id: tarea.id,
      tarea: tarea.tarea,
      fecha: tarea.fecha,
      prioridad: tarea.prioridad,
      estado: tarea.estado
    };
    if (!tarea) {
      res.send("tarea no encontrada");
    }
    return res.json(tareadb);
  };

module.exports = {
    
    createTarea,
    deleteTarea,
    updateTarea,
    getAllTareasByEmpresa,
    getTareaById
  }