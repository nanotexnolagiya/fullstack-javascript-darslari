const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { UserRoutes } = require('./modules/Users/routes');
const { AuthRoutes } = require('./modules/Auth/routes');
const { isAdmin } = require('./modules/Auth/middleware/');
const { AuthController } = require('./modules/Auth/controllers');


function Server () {
  this.app = express()
  this.server = null
  this.setup()
  this.routes()
}


Server.prototype.setup = function () {
  this.app.use(cors())
  this.app.use(morgan('tiny'))
  this.app.use(helmet())
  this.app.use(bodyParser.json())
  this.app.use(bodyParser.urlencoded({ extended: true }))
}

Server.prototype.routes = function () {
  const userRoutes = new UserRoutes()
  const authRoutes = new AuthRoutes()
  const authController = new AuthController()
  this.app.use('/api/auth', authRoutes.router)
  // Public

  // User
  this.app.use('/api', authController.checkAuth.bind(authController))

  // Admin
  this.app.use('/api', isAdmin)
  this.app.use('/api/users', userRoutes.router)

  // Error handling
  this.app.use('*', (req, res, next) => {
    res.status(404).json({
      status: 404
    })
  })
  this.app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log('Error', err)
    res.json({
        message: err.message,
        error: err
    });
  });
}

Server.prototype.start = function (cb) {
  this.server = this.app.listen(process.env.PORT, cb)
}

Server.prototype.stop = function () {
  this.server.close();
}

module.exports = Server