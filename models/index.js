// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
// TODO add delete cascade when necessary
// Products belongsTo Category
Product.belongsTo(Category, {foreignKey: "category_id"});

// Categories have many Products
Category.hasMany(Product);

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {through: ProductTag, uniqueKey: "product_id"});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {through: ProductTag, uniqueKey: "tag"});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
