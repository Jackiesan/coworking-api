const { MONGO_DB_CONNECTION, NODE_ENV, PORT } = process.env
const express = require('express')
const mongoose = require('mongoose')
const app = express()

if (MONGO_DB_CONNECTION) {
  const options = { useFindAndModify: false, useNewUrlParser: true }
  mongoose.connect(MONGO_DB_CONNECTION, options)
  console.log('Connected to database!')
} else {
  console.log('MONGO_DB is not provided')
}

if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

// Routes
app.use('/api/v1/units', require('./api/routes/units'))

// Not Found Handler
app.use((req, res, next) => {
  const error = new Error(`Could not ${req.method} ${req.path}`)
  error.status = 404
  next(error)
})

// Error Handler
app.use((err, req, res, next) => {
  if (NODE_ENV === 'development') console.error(err)
  const { message, status } = err
  res.status(status).json({ status, message })
})

const listener = () => console.log('Server is running')
app.listen(PORT, listener)