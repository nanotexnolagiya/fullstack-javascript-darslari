const { dbConnection } = require('../../../database/connect')

function BaseDao (tableName) {
  this.db = dbConnection
  this.tableName = tableName
}

BaseDao.prototype.getTable = function () {
  return this.db(this.tableName)
}

BaseDao.prototype.findAll = function (options = {}) {
  let table = this.getTable().select()
  
  if (Object.keys(options)) {
    return table.where(options)
  }
  return table
}

BaseDao.prototype.find = function (options = {}) {
  return this.getTable().select().where(options).first()
}

BaseDao.prototype.findOrCreate = function (options = {}, data) {
  return new Promise((resolve, reject) => {
    this.getTable().select().where(options).first().then(result => {
      if (result) {
        return resolve(result)
      } else {
        return this.create(data).then(resolve).catch(reject)
      }
    })
  })
}

BaseDao.prototype.create = function (data) {
  return this.getTable().insert(data).returning('*')
}

BaseDao.prototype.update = function (options, data) {
  return this.getTable().where(options).update(data).returning('*')
}

BaseDao.prototype.delete = function (options) {
  return this.getTable().where(options).del()
}

module.exports = { BaseDao }