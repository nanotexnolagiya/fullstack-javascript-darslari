const { BaseDao } = require('../../Common/dao')
const { TABLES } = require('../../../config')

function UserDao () {
  BaseDao.call(this, TABLES.USERS);
}

UserDao.prototype = Object.create(BaseDao.prototype);
UserDao.prototype.constructor = UserDao;


module.exports = {
  UserDao
}