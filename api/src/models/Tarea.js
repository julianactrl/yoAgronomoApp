const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("tarea", {
    tarea: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      // get: function(){ 
      //   return 
      //   moment(getDataValue('DateTime')).format('DD.MM.YYYY')
      // }
    },
    prioridad: {
      type: DataTypes.STRING
    },
    estado: {
      type: DataTypes.STRING
    }

  }); 
};