const { Order, OrderItem, ProductTypeSize, User } = require('../models')

class OrderController {
  constructor () {
    this.index = this.index.bind(this)
    this.userIndex = this.userIndex.bind(this)
  }

  orderListWithTotal (orders) {
    return orders.map(order => {
      const total = order.OrderItems.reduce((acc, item) => {
        return acc + parseFloat(item.ProductTypeSize.price)
      }, 0)

      return {
        id: order.id,
        createdAt: order.createdAt,
        total,
        user: order.user ? order.User.name : '',
        OrderItems: order.OrderItems
      }
    })
  }

  async store (req, res) {
    const { zipcode, streetAddress, district, note, items } = req.body
    const { id } = req.params
    const order = await Order.create({
      zipcode,
      streetAddress,
      district,
      note,
      user_id: id
    })

    if (order) {
      items.map(async item => {
        await OrderItem.create({
          order_id: order.id,
          product_type_size_id: item.id
        })
      })
    }

    return res.json(order)
  }

  async index (req, res) {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: OrderItem,
          attributes: ['product_type_size_id'],
          include: [
            {
              model: ProductTypeSize
            }
          ]
        }
      ]
    })

    // somar os valores dos itens antes de retornar
    const list = this.orderListWithTotal(orders)

    return res.json(list)
  }

  async userIndex (req, res) {
    const { id } = req.params
    const orders = await Order.findAll({
      where: {
        user_id: id
      },
      include: [
        {
          model: OrderItem,
          attributes: ['product_type_size_id'],
          include: [
            {
              model: ProductTypeSize,
              attributes: ['price']
            }
          ]
        }
      ]
    })

    const list = this.orderListWithTotal(orders)

    return res.json(list)
  }
}

module.exports = new OrderController()
