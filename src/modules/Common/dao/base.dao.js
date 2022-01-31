const { dbConnection } = require('../../../database/connect')

function BaseDao (tableName) {
  this.table = dbConnection(tableName)
}

BaseDao.prototype.findAll = function (options = {}) {
  return this.table.where(options)
}

BaseDao.prototype.find = function (options = {}) {
  return this.table.where(options).limit(1)
}

BaseDao.prototype.create = function (data) {
  return this.table.insert(data).returning('*')
}

BaseDao.prototype.update = function (options, data) {
  return this.table.where(options).update(data)
}

BaseDao.prototype.delete = function (options, data) {
  return this.table.where(options, data)
}

module.exports = { BaseDao }