const express = require('express')
const cors = require('cors')

class App {
  constructor () {
    this.express = express()
    this.server = require('http').Server(this.express)
    this.io = require('socket.io')(this.server)

    this.isDev = process.env.NODE_ENV !== 'production'
    this.middleware()
    this.routes()
  }

  middleware () {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use((req, res, next) => {
      req.io = this.io

      return next()
    })
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().server
