const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("manejoDeLote", {
    recomendaciones: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
};
