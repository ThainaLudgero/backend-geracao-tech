const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        field: 'enabled'
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'name'
    },
    slug: {
        type: DataTypes.STRING(50),
        allowNull: false, 
        field: 'slug'
    },
    use_in_menu: {
        type: DataTypes.BOOLEAN,
        defaultValue: '0', 
        field: 'use_in_menu'
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0, 
        field: 'stock'
    },
    description: {
        type: DataTypes.STRING(100),
        defaultValue: 'null', 
        field: 'description'
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false, 
        field: 'price'
    },
    price_with_discount: {
        type: DataTypes.FLOAT,
        allowNull: false, 
        field: 'price_with_discount'
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
  tableName: 'products'
});

module.exports = Product;
