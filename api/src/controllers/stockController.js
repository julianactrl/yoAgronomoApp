const {Stock, Lote} = require("../db");
const { Op } = require("sequelize");

const postStock = async(req, res) => {
    const {tipo, cantidad,loteId} = req.body;
    try{
        await Stock.create({
            tipo,
            cantidad,
            loteId
        });
        res.json('Stock generado con éxito!');
    }
    catch(error){
        console.log(error)
        res.status(500).send('Error al crear el stock');
    }
}
const editStock = async(req, res) => {
    const {id} = req.params;
    const {tipo, cantidad} = req.body;
    let StockFind = await Stock.findAll({
        where:{
            id
        }
    })
    if (StockFind.length > 0) {
        StockFind.map(async (Stock) => {
            await Stock.update({
                tipo,
                cantidad
            });
        });
        return res.json({
            message: "Stock actualizado",
        })
    }
}
const getAllStock = async (req, res) => {
    const allStock = await Stock.findAll()
    res.send(allStock);
}
const getStockByLote = async (req,res) => {
    const {id} = req.params
    try {
        const stock = await Stock.count();
        if (stock !== 0) {
          res.status(201).json(await Stock.findAll({
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
const deleteStock = async(req,res) => {
    const {id} = req.params
    try {
        const deletedStock = await Stock.destroy({
            where: {
                id
            }
        });
        res.json({
            message: "Stock deleted succesfully",
            data: deletedStock
        })
    } catch (error) {
        res.json({
            message: "Delete failed",
            data: {}
        })
    }
}
module.exports = {
    postStock,
    editStock,
    getAllStock,
    getStockByLote,
    deleteStock
}