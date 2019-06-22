module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    zipcode: DataTypes.INTEGER,
    streetAddress: DataTypes.STRING,
    district: DataTypes.STRING,
    note: DataTypes.STRING
  })

  Order.associate = models => {
    Order.belongsTo(models.User, { foreignKey: 'user_id' })
    Order.hasMany(models.OrderItem)
  }

  return Order
}
