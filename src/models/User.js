const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const User = sequelize.define('User', {
  idusuarios: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idusuarios' 
  },
  firstname: {
    type: DataTypes.STRING(300),
    allowNull: false,
    field: 'firstname'
  },
  surname: {
    type: DataTypes.STRING(300),
    allowNull: false,
    field: 'surname'
  },
  email: {
    type: DataTypes.STRING(300),
    allowNull: false,
    unique: true,
    field: 'email'
  },
  password: {
    type: DataTypes.STRING(300),
    allowNull: false,
    field: 'password'
  },
  role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user'
  },
  created_at: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW
  },
  updated_at: {
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: null,
      onUpdate: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'users'
});

module.exports = User;
