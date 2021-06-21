const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

        sequelize.define('manejoDeLote', {
            observaciones: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            recomendaciones: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
            }
        })
}