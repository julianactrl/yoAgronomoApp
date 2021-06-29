const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("lote", {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    superficie: {
      type: DataTypes.STRING,
    },
    ubicacion: {
      type: DataTypes.STRING,
    },
    imagen: {
      type: DataTypes.STRING,
    },
    poliId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
