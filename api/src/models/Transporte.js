'use strict';
const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

        sequelize.define('transporte', {
      
            patente: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            conductor: {
                type: DataTypes.STRING,
            },
            carga: {
                type: DataTypes.STRING,
            },
            fechaEntrada: {
                type: DataTypes.STRING,
            },
            fechaSalida: {
                type: DataTypes.STRING,
            },
            observaciones: {
                type: DataTypes.STRING,
            }
        });
};