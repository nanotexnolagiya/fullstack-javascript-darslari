const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { UserRoutes } = require('./modules/Users/routes');


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
  this.app.use(bodyParser.urlencoded({ extended: true}))
}

Server.prototype.routes = function () {
  const userRoutes = new UserRoutes()
  this.app.use('/api/users', userRoutes.router)
  this.app.use('*', (req, res, next) => {
    res.status(404).json({
      status: 404
    })
  })
  this.app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
  });
}

Server.prototype.start = function (cb) {
  this.server = this.app.listen(process.env.PORT, cb)
}

Server.prototype.stop = function () {
  this.server.close();
}

module.exports = Server