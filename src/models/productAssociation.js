const Product = require('./Product');
const ProductImage = require('./ProductImage');
const Category = require('./Category');

// Relacionamento entre Product e ProductImage
Product.hasMany(ProductImage, {
    foreignKey: 'id_product', 
    as: 'images'               
});

ProductImage.belongsTo(Product, {
    foreignKey: 'id_product',
    as: 'product'
});

// Relacionamento entre Product e Category
Product.belongsToMany(Category, {
    through: 'product_categories', // Tabela intermediária
    foreignKey: 'id_product',
    otherKey: 'id_category',
    as: 'categories'
});

Category.belongsToMany(Product, {
    through: 'product_categories',
    foreignKey: 'id_category',
    otherKey: 'id_product',
    as: 'products'
});

module.exports = { Product, ProductImage };
