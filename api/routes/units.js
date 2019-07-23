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

// PATCH /api/v1/units/[id]
router.patch('/:id', async (req, res, next) => {
  const status = 200
  const unit = await Units.findById(req.params.id)

  for(let attribute in req.body) {
    unit[attribute] = req.body[attribute]
  }
  await unit.save()

  res.status(status).json({ status, unit })
})


// PATCH /api/v1/units/[id]/company



module.exports = router