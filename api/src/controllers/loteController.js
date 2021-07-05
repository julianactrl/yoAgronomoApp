const {Lote, Empresa, ManejoDeLote, User} = require("../db");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");

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
        return next(error)
        
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
    const { name, superficie, ubicacion, empresaId, idUser} = req.body;

    if(req.file){
        var Lot = req.file.filename
    }
    try{
        var cantidad = await Lote.count({
            where: {
                empresaId: empresaId 
            }
          })
          var user = await User.findByPk(idUser);
            if(cantidad >= 2 && user.isPremium === false ){
             return res.status(500).send("Debe hacerse premium")
            }
         await Lote.create({
            name,
            superficie,
            ubicacion,
            empresaId,
            imagen:Lot
        });  res.status(200).json("fue  creada con exito");
    } catch (error) {
      console.log(error);
      res.status(500).send(next);
    }
}
const updateLote = async(req,res,next) => {
    const { id } = req.params;
    const { name, superficie, ubicacion, imagen,poliId} = req.body;

    const loteUpdated = await Lote.findAll({
        atributes: ['id', 'name', 'superficie', 'ubicacion', 'imagen','poliId'],
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
                imagen,
                poliId
            });
        });
        return res.json({
            message: "Lote updated",
            data: loteUpdated
        })
    }
}
// const setPolyId = async(req,res) => {
//     const {id} = req.params;
//     const {poliId} = req.body;

//     let setPoly = await Lote.findAll({
//         where: {
//             id
//         }
//     })
//     if (setPoly.length > 0) {
//         setPoly.map(async Lote => {
//             await Lote.update({
//                 poliId
//             });
//         });
//         return res.json({
//             message: "Poly Id seteado correctamente",
//             data: poliId
//         })
//     }

// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////// MANEJO DE LOTE/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const createManejo = async (req,res,next) => {
    const { loteId } = req.params
    const { observaciones, recomendaciones, image } = req.body;

    if(req.file){
        var manejo = req.file.filename
    }
    try{
        await ManejoDeLote.create({
            loteId,
            observaciones,
            image,
            recomendaciones,
            image:manejo
        });  res.status(200).json("fue  creado con exito");
       
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
        // const Manejo = await ManejoDeLote.count();
        // if (Manejo !== 0) {
          res.status(201).json(await ManejoDeLote.findAll({
              include: {
                  model: Lote,
                  where :{
                      id
                  }
              }
          }));
        // }
      } catch (e) {
        res.status(404).send(next);
      }
}
  const deleteManejo = async (req, res, next) => {
    try {
      const { id } = req.params;
      await ManejoDeLote.destroy({
        where: {
          id: id
        },
      });
      res.json({ message: "Manejo Eliminado" });
    } catch (e) {
      res.status(500).send(next);
    }
  };
/////////////////////////////////////////////////////////

const getImageLote = (req, res) => {
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

  const getImageManejoLote = (req, res) => {
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
    getImageLote,
    getImageManejoLote,
    
  }
