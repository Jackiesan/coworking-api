const router = require('express').Router()
const Units = require('../models/units')
var mongoose = require('mongoose');

router.get('/', async (req, res, next) => {
  status = 200

  try {
    // Get all companies first
    const companies = []
    const units = await Units.find()
    for(let i=0; i < units.length; i++) {
      if (units[i]['company'] !== undefined && units[i]['company'] !== null) {
        companies.push(units[i]['company'])
      }
    }

    // GET /api/v1/employees?name=[partial-query]
    if (req.query.name) {
      const employees = []
      for(let i=0; i < companies.length; i++) {
        const allEmployees = companies[i]['employees']
        for(let k=0; k < allEmployees.length; k++) {
          const fullName = (allEmployees[k]['first_name'] + " " + allEmployees[k]['last_name'])
          const regex = new RegExp(req.query.name, "gi")
          if (fullName.match(regex)) {
            employees.push(fullName)
          }
        }
      }
      res.json({ status, employees })
    }

    // GET /api/v1/employees?birthday=[date]
    if (req.query.birthday) {
      const employees = []
      for(let i=0; i < companies.length; i++) {
        const allEmployees = companies[i]['employees']
        for(let k=0; k < allEmployees.length; k++) {
          if (allEmployees[k]['birthday'] === req.query.birthday) {
            const fullName = (allEmployees[k]['first_name'] + " " + allEmployees[k]['last_name'])
            employees.push(fullName)
          }
        }
      }
      res.json({ status, employees })
    }

  } catch (error) {
    const e = new Error(`Something went wrong`)
    e.status = 404
    next(e)
  }
})

module.exports = router