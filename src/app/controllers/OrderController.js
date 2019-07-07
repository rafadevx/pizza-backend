const {
  Order,
  OrderItem,
  ProductType,
  ProductTypeSize,
  User
} = require('../models')
const { formatRelative } = require('date-fns')
const pt = require('date-fns/locale/pt')

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
        formattedDate: formatRelative(new Date(order.createdAt), new Date(), {
          locale: pt
        }),
        total,
        note: order.note,
        user: order.User ? order.User.name : '',
        OrderItems: order.OrderItems
      }
    })
  }

  async store (req, res) {
    const { zipcode, streetAddress, district, note, items } = req.body
    const { userId } = req
    const order = await Order.create({
      zipcode,
      streetAddress,
      district,
      note,
      user_id: userId
    })

    if (order) {
      items.map(async item => {
        await OrderItem.create({
          order_id: order.id,
          product_type_size_id: item.id
        })
      })
    }

    req.io.emit('order', 'new')

    return res.json(order)
  }

  async index (req, res) {
    const orders = await Order.findAll({
      order: [['createdAt', 'DESC']],
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
              model: ProductTypeSize,
              include: [
                {
                  model: ProductType,
                  attributes: ['name', 'image']
                }
              ]
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
    const { userId } = req
    const orders = await Order.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        user_id: userId
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
