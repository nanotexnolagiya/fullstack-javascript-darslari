
const router = require('express').Router();
const { UserController } = require('../controllers')

function UserRoutes () {
  this.userController = new UserController()
  this.router = router

  this.setRoutes();
}

UserRoutes.prototype.setRoutes = function () {
  this.router.get('/', this.userController.findAll.bind(this.userController))
  this.router.get('/:id', this.userController.find.bind(this.userController))
  this.router.post('/', this.userController.create.bind(this.userController))
  this.router.put('/:id', this.userController.update.bind(this.userController))
  this.router.delete('/:id', this.userController.delete.bind(this.userController))
}

module.exports = {
  UserRoutes
}

