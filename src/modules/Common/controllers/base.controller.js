function BaseController (dao) {
  this.dao = dao
}

BaseController.prototype.findAll = function (req, res, next) {
  this.dao.findAll().then(items => {
    res.json(items)
  }).catch(next)
}

BaseController.prototype.find = function (req, res, next) {
  const { params } = req
  this.dao.find({ id: params.id }).then(item => {
    res.json(item)
  }).catch(next)
}

BaseController.prototype.create = function (req, res, next) {
  const { body } = req
  this.dao.create(body)
    .then(([item]) => {
      res.status(201).json(item)
    })
    .catch(next)
}

BaseController.prototype.update = function (req, res, next) {
  const { body, params } = req

  this.dao.update({ id: params.id }, body).then(result => {
    res.status(202).json(result)
  }).catch(next)
}

BaseController.prototype.delete = function (req, res, next) {
  const { body, params } = req

  this.dao.delete({ id: params.id }, body).then(() => {
    res.status(204).json({ OK: true })
  }).catch(next)
}

module.exports = { BaseController }