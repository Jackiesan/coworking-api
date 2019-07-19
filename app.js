const { MONGO_DB, NODE_ENV, PORT } = process.env
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()

if (MONGO_DB) {
  const options = { useFindAndModify: false, useNewUrlParser: true }
  mongoose.connect(MONGO_DB, options)
  console.log('Connected to database!')
} else {
  console.log('MONGO_DB is not provided')
}

if (NODE_ENV === 'development') app.use(morgan('dev'))
app.use(require('body-parser').json())

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Something went wrong.'
  console.error(err)
  res.json({ status, message })
})

const listener = () => console.log('Server is running')
app.listen(PORT, listener)