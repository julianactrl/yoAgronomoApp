const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

        sequelize.define('manejoDeLote', {
            recOrObserv: {
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