module.exports = (sequelize, DataTypes) => {
  const ProductTypeSize = sequelize.define('ProductTypeSize', {
    size: DataTypes.STRING,
    price: DataTypes.DECIMAL(5, 2),
    image: DataTypes.STRING
  })

  ProductTypeSize.associate = models => {
    ProductTypeSize.belongsTo(models.ProductType, {
      foreignKey: 'product_type_id'
    })
  }

  return ProductTypeSize
}
