module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    product_type_size_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  })

  OrderItem.associate = models => {
    OrderItem.belongsTo(models.Order, { foreignKey: 'order_id' })
    OrderItem.belongsTo(models.ProductTypeSize, {
      foreignKey: 'product_type_size_id'
    })
  }

  return OrderItem
}
