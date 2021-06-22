const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

        sequelize.define('manejoDeLote', {
            recomendaciones: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            observaciones: {
                type: DataTypes.STRING,
            },
            image: {
                type: DataTypes.STRING,
            }
        })
}