import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Repository = sequelize.define('Repository', {
  githubId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: DataTypes.STRING,
  stars: DataTypes.INTEGER,
  url: DataTypes.STRING,
  description: DataTypes.TEXT,
}, {
  tableName: 'repositories',
});

export default Repository;
