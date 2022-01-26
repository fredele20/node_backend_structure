const winston = require('winston')
// require('winston-mongodb')
require("express-async-errors");

module.exports = function () {
  new winston.ExceptionHandler(new winston.transports.File({
    filename: 'uncaughtException.log'
  }))

  winston.add(new winston.transports.File({
    filename: 'logfile.log'
  }))
  // winston.add(new winston.transports.MongoDB({
  //   db: 'mongodb://localhost/backend'
  // }))
}