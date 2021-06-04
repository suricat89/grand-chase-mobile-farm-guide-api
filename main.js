'use strict'
import express from 'express'
import httpErrors from 'http-errors'
import pino from 'pino'
import pinoHttp from 'pino-http'

import routes from './routes'

export default async (options, cb) => {
  // Set default options
  const ready = cb || function () {}
  const opts = Object.assign({
    // Default options
  }, options)

  const logger = pino()

  // Server state
  let serverStarted = false
  let serverClosing = false

  // Setup error handling
  const unhandledError = (err) => {
    // Log the errors
    logger.error(err)

    // Only clean up once
    if (serverClosing) {
      return
    }
    serverClosing = true

    // If server has started, close it down
    if (serverStarted) {
      server.close(function () {
        process.exit(1)
      })
    }
  }
  process.on('uncaughtException', unhandledError)
  process.on('unhandledRejection', unhandledError)

  // Create the express app
  const app = express()

  app.use(pinoHttp({ logger }))
  routes(app, opts)

  app.use((req, res, next) => {
    next(httpErrors(404, `Route not found: ${req.url}`))
  })

  app.use((err, req, res, next) => {
    if (err.status >= 500) {
      logger.error(err)
    }
    res.status(err.status || 500).json({
      messages: [{
        code: err.code || 'InternalServerError',
        message: err.message
      }]
    })
  })

  // Start server
  const server = app.listen(opts.port, opts.host, (err) => {
    if (err) {
      return ready(err, app, server)
    }

    // If some other error means we should close
    if (serverClosing) {
      return ready(new Error('Server was closed before it could start'))
    }

    serverStarted = true
    const addr = server.address()
    logger.info(`Started at ${opts.host || addr.host || 'localhost'}:${addr.port}`)
    ready(err, app, server)
  })
}
