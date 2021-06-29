//'use strict';
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "El email tiene que ser un correo valido",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [6, 255],
          msg: "La contraseña tiene que tener minimamente 6 caracteres",
        },
      },
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_pic: {
      type: DataTypes.STRING,
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    mp_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment_link: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
      allowNull: true,
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    order_status: {
      type: DataTypes.ENUM(
        "cancelled",
        "completed",
        "processing"
      ),
      allowNull: false,
      defaultValue: "processing"
    },
  });

  // User.associate = function(models) {
  //   User.hasMany(models.Post, { as: "posts", foreignKey: "userId" });
  //   User.belongsToMany(models.Role, { as: "roles", through: "user_role", foreignKey: "user_id" });
  // };

  // Comprueba que el usuario es administrador
  // User.isAdmin = function(roles) {
  //   let tmpArray = [];
  //   roles.forEach(role => tmpArray.push(role.role));

  //   return tmpArray.includes('admin');
  // }

  // return User;
};
