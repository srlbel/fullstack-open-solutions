const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRoutes = require('./controllers/blogs')
const usersRoutes = require('./controllers/users')
const middleware = require('./utils/middleware')

const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MONGODB')
  })
  .catch((e) => {
    logger.error('error conecting to MONGODB: ', e.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRoutes)
app.use('/api/users', usersRoutes)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
