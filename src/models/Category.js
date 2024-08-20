const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajuste o caminho conforme sua configuração

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'name'
    },
    slug: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        field: 'slug'
    },
    use_in_menu: {
        type: DataTypes.BOOLEAN,
        defaultValue: '0',
        field: 'use_in_menu'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'updated_at'
    }
}, {
  timestamps: false,
  tableName: 'categories'
});

module.exports = Category;
