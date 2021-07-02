const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

        sequelize.define('stock', {
            tipo: {
                type: DataTypes.ENUM('Insumo', 'Semilla'),
                allowNull: false,
            },
            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            nombreProducto: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        })
}