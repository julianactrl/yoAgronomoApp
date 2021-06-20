const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

        sequelize.define('manejoDeLote', {
            observaciones: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            recomendaciones: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description: {
                type: DataTypes.STRING,
            },
            image: {
                type: DataTypes.STRING,
            }
        })
}