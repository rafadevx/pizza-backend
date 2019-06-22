const { Product } = require('../models')

class ProductController {
  async store (req, res) {
    const { filename: image } = req.file
    const product = await Product.create({
      ...req.body,
      image
    })
    return res.json(product)
  }

  async index (req, res) {
    const products = await Product.findAll()

    return res.json(products)
  }
}

module.exports = new ProductController()
