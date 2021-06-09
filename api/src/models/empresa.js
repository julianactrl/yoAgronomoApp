const {DataTypes} = require(sequelize);

module.exports = (sequelize) => {

        sequelize.define('empresa', {
            Nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Superficie: {
                type: DataTypes.STRING,
            },
        })








}