const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("gastos", {
    name: {
      type: DataTypes.STRING,
    },
    cost: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.STRING,
    },
  });
};
