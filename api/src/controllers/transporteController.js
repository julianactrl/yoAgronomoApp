const {Empresa, Transporte} = require("../db")

const createTransporte = async(req, res, next) =>{
    const {patente, conductor, carga, fechaEntrada, fechaSalida, observaciones, empresaId} = req.body;
    try {
        let newTransporte = await Transporte.create({
        patente,
        conductor,
        carga,
        fechaEntrada,
        fechaSalida,
        observaciones,
        empresaId

        }, {
            fields: [  "patente", "conductor", "carga", "fechaEntrada", "fechaSalida", "observaciones",  "empresaId"]
        })
        if(newTransporte){
            res.status(200).json({
                message: "Transporte creado correctamente",
                data: newTransporte})
        }
        
    } catch (error) {
        if(!newTransporte){
            res.status(400).json({ 
                message: "No se pudo crear el transporte"
            })
        }
        
    }
}

const updateTransporte = async (req, res, next) => {
    const {patente, conductor, carga, fechaEntrada, fechaSalida, observaciones} = req.body;
    const {id} = req.params;
 const updateTransporte = await Transporte.findAll({
     atributes: [ 'patente', 'conductor', 'carga', 'fechaEntrada', 'fechaSalida', 'observaciones'], 
     where: {
         id
     }
 })
 if(updateTransporte.length > 0){
     updateTransporte.map(async transp => {
         await transp.update({
             patente,
             conductor,
             carga,
             fechaEntrada,
             fechaSalida,
             observaciones
         })
     });
     return res.json({ message: "Transporte actualizado", data: updateTransporte})
 }
}

const getAllTransportes = async (req, res, next) => {
    const {id} = req.params;
    try {
        const empresa = await Transporte.count();
        if(empresa) {
            res.status(201).json(await Transporte.findAll({
                include: {
                    model: Empresa,
                    where:{
                        id
                    }
                }
            }))
        }
    } catch (error) {
        res.status(404).send(next);
        
    }
}

const getTransporteById = async (req,res,next) => {
    const { id } = req.params;
    try {
        const transporte = await Transporte.findOne({
            where: {
                id
            }
        })
        res.json(transporte)
    } catch (error) {
        return next(error)
        
    }
}




const deleteTransporte =  async (req, res, next) => {
    const {id} = req.params;
    try {
        const deletedTransporte = await Transporte.destroy({ where: {id}})
        res.json({
            message: "Transporte eliminado",
            data: deletedTransporte
        });
    } catch (error) {
        res.json({
            message: "No se ha podido eliminar el transporte",
            data: {}
        })
    }
} 


module.exports = {
    deleteTransporte,
    getAllTransportes,
    createTransporte,
    updateTransporte,
    getTransporteById


}
