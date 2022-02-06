const { BaseDao } = require('../../Common/dao')
const { TABLES } = require('../../../config')

function AuthDao () {
  BaseDao.call(this, TABLES.USERS);
}

AuthDao.prototype = Object.create(BaseDao.prototype);
AuthDao.prototype.constructor = AuthDao;


module.exports = {
  AuthDao
}