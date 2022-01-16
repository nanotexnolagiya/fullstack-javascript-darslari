const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');


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
}

Server.prototype.routes = function () {
  this.app.use('/api', (req, res) => {
    res.send({ ok: true, message: 'OK' })
  })
}

Server.prototype.start = function (cb) {
  this.server = this.app.listen(process.env.PORT, cb)
}

Server.prototype.stop = function () {
  this.server.close();
}

module.exports = Server