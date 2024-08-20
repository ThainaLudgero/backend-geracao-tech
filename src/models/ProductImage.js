const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductImage = sequelize.define('ProductImage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'id_product'
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0, 
        field: 'enabled'
    },
    path: {
        type: DataTypes.STRING(1000),  
        allowNull: false, 
        field: 'path'
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
  tableName: 'product_image'
});

module.exports = ProductImage;
