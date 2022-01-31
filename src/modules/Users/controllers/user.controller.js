const { BaseController } = require('../../Common/controllers')
const { UserDao } = require('../dao')

function UserController () {
  const userDao = new UserDao()
  BaseController.call(this, userDao);
}

UserController.prototype = Object.create(BaseController.prototype);
UserController.prototype.constructor = UserController;


module.exports = {
  UserController
}