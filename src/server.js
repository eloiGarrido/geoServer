const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const ExpressLogs = require('express-server-logs')
const compress = require('compression')
const routes = require('./api/v1/router')
const server = express()
const xLogs = new ExpressLogs(false)
const error = require('./middleware/error')

// Enable body parser
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
// Add express logger
server.use(xLogs.logger)
// gzip compression
server.use(compress())
// Secure server by setting several http headers and disabling express watermark
server.use(helmet())
// Enable Cross Origin REsource Sharing
server.use(cors())

// Routes
server.use('/v1', routes)

// Error handling
server.use((err, req, res, next) => {
  error.handleError(err, res)
})

module.exports = server
