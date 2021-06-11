
const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

        sequelize.define('empresa', {
      
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            hectáreas: {
                type: DataTypes.STRING,
            },
            ubicación: {
                type: DataTypes.STRING,
            }
        })
}