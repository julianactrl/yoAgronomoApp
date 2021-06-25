//"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("post", {
    title: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.TEXT,
    },
  });

  //   Post.associate = function(models) {
  //     Post.belongsTo(models.User, { as: "author", foreignKey: "userId" })
  //   };
  //   return Post;
};
