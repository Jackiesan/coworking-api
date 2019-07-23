const router = require('express').Router()
const Units = require('../models/units')
var mongoose = require('mongoose');

// GET /api/v1/units
// GET /api/v1/units?kind=[kind]
// GET /api/v1/units?floor=[integer]
// TODO: GET /api/v1/units?occupied=[true/false]
router.get('/', async (req, res, next) => {
  status = 200
  const response = await Units.find(({...req.query}))
  res.json({ status, response })
})

// GET /api/v1/units/[id]/company/employees
router.get('/:id/company/employees', async (req, res, next) => {
  status = 200
  try {
    const unit = await Units.findById(req.params.id)
    const employees = unit.company.employees
    res.status(status).json({ status, employees })
  } catch (error) {
    const e = new Error(`Unit with ID ${req.params.id} not found`)
    e.status = 400
    next(e)
  }
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

// PATCH /api/v1/units/[id]/company
router.patch('/:id/company', async (req, res, next) => {
  const status = 200

  try{
  const unit = await Units.findById(req.params.id)
  const company = unit.company
  Object.assign(company, req.body)
  await unit.save()

  res.status(status).json({ status, company })
  } catch (error) {
    const e = new Error(`Unit with ID ${req.params.id} not found`)
    e.status = 404
    next(e)
  }
})

// PATCH /api/v1/units/[id]
router.patch('/:id', async (req, res, next) => {
  const status = 200

  try{
  const unit = await Units.findById(req.params.id)

  for(let attribute in req.body) {
    unit[attribute] = req.body[attribute]
  }
  await unit.save()

  res.status(status).json({ status, unit })
  } catch (error) {
    const e = new Error(`Unit with ID ${req.params.id} not found`)
    e.status = 404
    next(e)
  }
})

// DELETE http://localhost:5000/api/v1/units/5/company

router.delete('/:id/company', async (req, res, next) => {
  const status = 200

  try{
    const unit = await Units.findById(req.params.id)
    unit.company.remove()
    await unit.save()
    res.status(status).json({ status, unit })
  } catch (error) {
    const e = new Error(`Unit with ID ${req.params.id} not found`)
    e.status = 404
    next(e)
  }
})


module.exports = router