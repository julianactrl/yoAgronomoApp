//'use strict';
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("role", {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  //   Role.associate = function(models) {
  //     Role.belongsToMany(models.User, { as: "users", through: "user_role", foreignKey: "role_id" });
  //   };

  //   return Role;
};
