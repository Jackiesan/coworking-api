const router = require('express').Router()
const Units = require('../models/units')
var mongoose = require('mongoose');

// GET /api/v1/units
// GET /api/v1/units?kind=[kind]
// GET /api/v1/units?floor=[integer]
// TODO: GET /api/v1/units?occupied=[true/false]
router.get('/', async (req, res, next) => {
  status = 200
  try {
    const units = await Units.find().select('-__v')
    if (req.query.occupied === 'true') {
      const occupied_units = []
      for(let i=0; i < units.length; i++) {
        if (units[i].company) {
          occupied_units.push(units[i])
        }
      }
      res.json({ status, occupied_units })
    }

    if (req.query.occupied === 'false') {
      const unoccupied_units = []
      for(let i=0; i < units.length; i++) {
        if (!units[i].company) {
          unoccupied_units.push(units[i])
        }
      }
      res.json({ status, unoccupied_units })
    }

    const response = await Units.find(({...req.query})).select('-__v')
    res.json({ status, response })
  } catch (error) {
    const e = new Error(`Something went wrong`)
    e.status = 400
    next(e)
  }
})

// GET /api/v1/units/[id]/company/employees/[id]
router.get('/:id/company/employees/:employeeId', async (req, res, next) => {
  status = 200
  try {
    const unit = await Units.findById(req.params.id)
    if (unit.company === undefined) {
      const e = new Error(`Unit does not have a company listed`)
      e.status = 404
      return next(e)
    }
    const employees = unit.company.employees
    const employee = employees.find(employee => employee['_id'] == req.params.employeeId)
    if (employee === undefined) {
      const e = new Error(`Employee does not exist`)
      e.status = 404
      return next(e)
    }

    res.status(status).json({ status, employee })
  } catch (error) {
    const e = new Error(`Unit with ID ${req.params.id} not found`)
    e.status = 404
    next(e)
  }
})

// GET /api/v1/units/[id]/company/employees
router.get('/:id/company/employees', async (req, res, next) => {
  status = 200
  try {
    const unit = await Units.findById(req.params.id)
    if (unit.company === undefined) {
      const e = new Error(`Unit does not have a company listed`)
      e.status = 404
      return next(e)
    }
    const employees = unit.company.employees
    res.status(status).json({ status, employees })
  } catch (error) {
    const e = new Error(`Unit with ID ${req.params.id} not found`)
    e.status = 404
    next(e)
  }
})

// POST /api/v1/units/
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

// POST /api/v1/units/[id]/company/employees
router.post('/:id/company/employees', async (req, res, next) => {
  status = 200
  try {
    const unit = await Units.findById(req.params.id)
    if (unit.company === undefined) {
      const e = new Error(`Unit does not have a company listed`)
      e.status = 404
      return next(e)
    }
    const employees = unit.company.employees
    const employee = req.body
    employees.push(req.body)
    await unit.save()
    res.status(status).json({ status, employee })
  } catch (error) {
    const e = new Error(`Unit with ID ${req.params.id} not found`)
    e.status = 404
    next(e)
  }
})

// PATCH /api/v1/units/[id]/company/employees/[id]
router.patch('/:id/company/employees/:employeeId', async (req, res, next) => {
  status = 200
  try {
    const unit = await Units.findById(req.params.id)
    if (unit.company === undefined) {
      const e = new Error(`Unit does not have a company listed`)
      e.status = 404
      return next(e)
    }
    const employee = unit.company.employees.id(req.params.employeeId)
    if (employee === null) {
      const e = new Error(`Employee does not exist`)
      e.status = 404
      return next(e)
    }
    Object.assign(employee, req.body)
    await unit.save()

    res.status(status).json({ status, employee })
  } catch (error) {
    const e = new Error(`Unit with ID ${req.params.id} not found`)
    e.status = 404
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

// DELETE /api/v1/units/[id]/company/employees/[id]
router.delete('/:id/company/employees/:employeeId', async (req, res, next) => {
  status = 200
  try {
    const unit = await Units.findById(req.params.id)
    if (unit.company === undefined) {
      const e = new Error(`Unit does not have a company listed`)
      e.status = 404
      return next(e)
    }
    const employee = unit.company.employees.id(req.params.employeeId)
    if (employee === null) {
      const e = new Error(`Employee does not exist`)
      e.status = 404
      return next(e)
    }
    employee.remove()
    await unit.save()

    res.status(status).json({ status, employee })
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