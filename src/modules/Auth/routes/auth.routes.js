
const router = require('express').Router();
const { AuthController } = require('../controllers')

function AuthRoutes () {
  this.authController = new AuthController()
  this.router = router

  this.setRoutes();
}

AuthRoutes.prototype.setRoutes = function () {
  this.router.post('/login', this.authController.login.bind(this.authController))
  this.router.post('/check-code', this.authController.checkCode.bind(this.authController))
  this.router.use('/me', this.authController.checkAuth.bind(this.authController))
  this.router.post('/me', this.authController.me)
}

module.exports = {
  AuthRoutes
}

