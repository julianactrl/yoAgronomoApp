const { Empresa , Gastos, ClasificacionDeGastos} = require("../db");
const { Op } = require("sequelize");

/////////////////////////// CLASIFICACIONES //////////////////////////

const getAllClasificiones = async (req,res,next) => {
    const {id} = req.params /// ID DE LA EMPRESA ///
    try {
        const clasicaciones = await ClasificacionDeGastos.count();
        if (clasicaciones !== 0) {
          res.status(201).json(await ClasificacionDeGastos.findAll({
              include: {
                  model: Empresa,
                  where :{
                      id
                  }
              }
          }));
        //   CRUD
        }
      } catch (e) {
        res.status(404).send(next);
      }
}

const createClasificacion = async(req,res,next) => {
    const { name, empresaId} = req.body;
    try{
        console.log(req.params);
        const clasificacion = await ClasificacionDeGastos.create({
            name,
            empresaId
        }); 
        res.status(200).json(clasificacion);
    } catch (error) {
      console.log(error);
      res.status(500).send(next);
    }
}
const deleteClasificacion = async(req,res,next) => {
    const { id } = req.params;
    try{
        const clasificacionDeleted = await ClasificacionDeGastos.destroy({
            where: {
                id
            }
        });
        res.json({
            message: "Clasificacion deleted succesfully",
            data: clasificacionDeleted
        })
    } catch (error) {
        res.json({
            message: "Delete failed",
            data: {}
        }).send(next)
    }
}
/////////////////////////// GASTOS //////////////////////////

const createGasto = async(req,res,next) => {
    const { name, description, date, cost, clasificacionDeGastoId } = req.body;
    try{
         const gastoCreated = await Gastos.create({
            name,
            description,
            date,
            cost,
            clasificacionDeGastoId
        }); 
        res.status(200).json(gastoCreated);
    } catch (error) {
      console.log(error);
      res.status(500).send(next);
    }
}
const deleteGasto = async(req,res,next) => {
    const { id } = req.params;
    try{
        const deletedGasto = await Gastos.destroy({
            where: {
                id
            }
        });
        res.json({
            message: "Gasto deleted succesfully",
            data: id
        })
    } catch (error) {
        res.json({
            message: "Delete failed",
            data: {}
        }).send(next)
    }
}
const updateGasto = async(req,res,next) => {
    const { id } = req.params;
    const { name, description, date, cost} = req.body;

    const gastosUpdated = await Gastos.findAll({
        atributes: ['id', 'name', 'description', 'date', 'cost'],
        where: {
            id
        }
    })
    if (gastosUpdated.length > 0) {
        gastosUpdated.map(async gastos => {
            await gastos.update({
                name,
                description,
                date,
                cost
            });
        });
        return res.json({
            message: "Gasto updated",
            data: gastosUpdated
        })
    }
}
const getAllGastos = async (req,res,next) => {
    const {id} = req.params
    try {
        const gastos = await Gastos.count();
        if (gastos !== 0) {
          res.status(201).json(await Gastos.findAll({
              include: {
                  model: ClasificacionDeGastos,
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

const getGastosByInput = async (req,res,next) => {
    const { input } = req.params;
    try {
        const gastos = await Gastos.count();
        if (gastos !== 0) {
          let allGastos = await Gastos.findAll({
                    where: {
                        [Op.or]: {
                            name: {
                                [Op.or]:{
                                    [Op.like]: input,
                                    [Op.startsWith]: input,
                                    [Op.substring]: input
                                }
                            },
                            description: {
                                [Op.or]:{
                                    [Op.like]: input,
                                    [Op.startsWith]: input,
                                    [Op.substring]: input
                                }
                            }
                            ,
                            cost: {
                                [Op.or]:{
                                    [Op.like]: input,
                                    [Op.startsWith]: input,
                                    [Op.substring]: input
                                }
                            },
                            date: {
                                [Op.or]:{
                                    [Op.like]: input,
                                    [Op.startsWith]: input,
                                    [Op.substring]: input
                                }
                            },
                        }

                    }
          })
          res.json(allGastos)
        }
      } catch (e) {
        res.status(404).send('algo esta mal');
      }
}

/////////////// TOTAL ///////////////////

const getTotal = async (req,res,next) => {
    const { empresaId } = req.params
    // console.log('estoy trayendo el total ', empresaId);
    try {
        const gastos = await Gastos.count();
        const arrayGastos = [];
        if (gastos !== 0) {
        const selectedClasificacion = await ClasificacionDeGastos.findAll({
            where:{
                empresaId: empresaId
            }
        })
        selectedClasificacion.map(d=> {
            arrayGastos.push({clasificacion:d.name, clasificacionId:d.id})
            // console.log(arrayGastos);
        })
        for (let i = 0; i < arrayGastos.length; i++) {
            let gastosAux = await Gastos.findAll({
                include: {
                    model: ClasificacionDeGastos,
                    where :{
                        id: arrayGastos[i].clasificacionId
                    }
                }
             })
             arrayGastos[i].gastos = gastosAux.map(gasto=> Number(gasto.cost))
        }
        // console.log('en el final del total');
        arrayGastos.map((a,index)=>{
            // console.log(a, index);
            
            return arrayGastos[index].gastos = a.gastos[0] ? a.gastos.reduce( (acc,next) => acc + next) : (a.gastos[0] ? a.gastos[0] : 0)
        })
        res.json(arrayGastos)
        }
      } catch (e) {
        res.status(404).send('esta mal');
      }
}

module.exports = {
    getAllClasificiones,
    createClasificacion,
    deleteClasificacion,
    ///// GASTOS //////
    createGasto,
    deleteGasto,
    updateGasto,
    getAllGastos,
    getGastosByInput,
    ////// TOTAL //////
    getTotal
}
