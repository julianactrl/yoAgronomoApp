const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  // defino el modelo
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photoURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
  });

  
};