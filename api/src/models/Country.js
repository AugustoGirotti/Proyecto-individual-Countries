const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      primaryKey: true
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING
    },
    continent:{
      allowNull: false,
      type: DataTypes.STRING
    },
    capital:{
      allowNull: false,
      type: DataTypes.STRING
    },
    subregion:{
      type: DataTypes.STRING
    },
    area:{
      type: DataTypes.INTEGER
    },
    population:{
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  });
};
