const router = require('express').Router()
const Units = require('../models/units')
var mongoose = require('mongoose');

router.get('/', async (req, res, next) => {
  status = 200
  const response = await Units.find(({...req.query}))
  res.json({ status, response })
})

router.post('/', async (req, res, next) => {
  const status = 201

  try {
    const response = await Units.create(
      req.body
    )
    res.json({ status, response })
  } catch (error) {
    const e = new Error(error)
    e.status = 400
    next(e)
  }
})

module.exports = router