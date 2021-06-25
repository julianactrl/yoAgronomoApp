const {Stock} = require("../db");
const { Op } = require("sequelize");

const postStock = async(req, res) => {
    const {tipo, cantidad} = req.body;
    try{
        await Stock.create({
            tipo,
            cantidad
        });
        res.json('Stock generado con éxito!');
    }
    catch(error){
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
module.exports = {
    postStock,
    editStock,
    getAllStock
}