const { ProductType, Product } = require('../models')

class ProductTypeController {
  async store (req, res) {
    const { product } = req.params
    const { name } = req.body
    const { filename: image } = req.file

    const productType = await ProductType.create({
      name,
      image,
      product_id: product
    })

    return res.json(productType)
  }

  async index (req, res) {
    const { product } = req.params
    const productTypes = await ProductType.findAll({
      where: {
        product_id: product
      },
      include: [
        {
          model: Product,
          attributes: ['name']
        }
      ]
    })

    return res.json(productTypes)
  }
}

module.exports = new ProductTypeController()
