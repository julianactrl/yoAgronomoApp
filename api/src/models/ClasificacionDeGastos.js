const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("clasificacionDeGastos", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
