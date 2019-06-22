const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

// const authMiddleware = require('./app/middlewares/auth')
const adminAuthMiddleware = require('./app/middlewares/adminAuth')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const ProductController = require('./app/controllers/ProductController')
const ProductTypeController = require('./app/controllers/ProductTypeController')
const ProductTypeSizeController = require('./app/controllers/ProductTypeSizeController')
const OrderController = require('./app/controllers/OrderController')

// Signin, Signup routes
routes.post('/signup', UserController.store)
routes.post('/signin', SessionController.store)

// Products routes
routes.post('/app/products', upload.single('image'), ProductController.store)
routes.get('/app/products', ProductController.index)

// Product Types routes
routes.post(
  '/app/productType/:product',
  upload.single('image'),
  ProductTypeController.store
)
routes.get('/app/productType/:product', ProductTypeController.index)

// Product Type Sizes routes
routes.post(
  '/app/productTypeSize/:productType',
  upload.single('image'),
  ProductTypeSizeController.store
)
routes.get('/app/productTypeSize/:productType', ProductTypeSizeController.index)
routes.get('/app/productTypeSize/show/:id', ProductTypeSizeController.show)

// Order routes
routes.post('/app/order/:id', OrderController.store)
routes.get('/app/order/', adminAuthMiddleware, OrderController.index)
routes.get('/app/order/user/:id', OrderController.userIndex)

module.exports = routes
