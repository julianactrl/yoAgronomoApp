const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("empresa", {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hectareas: {
      type: DataTypes.STRING,
    },
    ubicacion: {
      type: DataTypes.STRING,
    },
    imagen: {
      type: DataTypes.STRING,
    },
  });
};
