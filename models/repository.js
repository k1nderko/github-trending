import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Repository = sequelize.define('Repository', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stars: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Repository;
