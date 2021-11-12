const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id:{
        // allowNull: false,
        unique: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    difficulty:{
        type: DataTypes.INTEGER,
        validate:{
            min: 1,
            max: 5
        }
    },
    duration:{
        type: DataTypes.INTEGER
    },
    season:{
        type: DataTypes.STRING,
        validate:{
            isIn: [['summer', 'autumn', 'winter', 'spring']]
        }
    }
  }, {
      timestamps: false
  });
};