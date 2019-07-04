const { ProductType, ProductTypeSize } = require('../models')

class ProductTypeSizeController {
  async store (req, res) {
    const { productType } = req.params
    const { size, price } = req.body
    const { filename: image } = req.file

    const productTypeSize = await ProductTypeSize.create({
      size,
      price,
      image,
      product_type_id: productType
    })

    return res.json(productTypeSize)
  }

  async index (req, res) {
    const { productType } = req.params
    const productTypeSizes = await ProductTypeSize.findAll({
      where: {
        product_type_id: productType
      },
      include: [
        {
          model: ProductType,
          attributes: ['name', 'image']
        }
      ]
    })

    return res.json(productTypeSizes)
  }

  async show (req, res) {
    const productTypeSize = await ProductTypeSize.findAll({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: ProductType,
          attributes: ['name', 'image']
        }
      ]
    })

    return res.json(productTypeSize)
  }
}

module.exports = new ProductTypeSizeController()
