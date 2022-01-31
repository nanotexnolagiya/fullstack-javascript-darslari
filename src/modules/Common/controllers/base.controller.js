function BaseController (dao) {
  this.dao = dao
}

BaseController.prototype.findAll = function (req, res, next) {
  this.dao.findAll().then(items => {
    res.json(items)
  })
}

BaseController.prototype.find = function (req, res, next) {
  
}

BaseController.prototype.create = function (req, res, next) {
  const { body } = req
  this.dao.create(body).then(createdItems => {
    res.status(201).json(createdItems[0])
  })
}

BaseController.prototype.update = function (req, res, next) {
  const { body, param } = req

  this.dao.update({ id: param.id }, body).then(result => {
    res.status(202).json(result)
  })
}

BaseController.prototype.delete = function (req, res, next) {
  
}

module.exports = { BaseController }