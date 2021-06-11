const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("empresa", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    superficie: {
      type: DataTypes.STRING,
    },
  });
};
