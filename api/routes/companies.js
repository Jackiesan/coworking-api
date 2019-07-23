const router = require('express').Router()
const Units = require('../models/units')
var mongoose = require('mongoose');

// GET /api/v1/companies
router.get('/', async (req, res, next) => {
  const status = 200
  const companies = []
  const units = await Units.find()

  for(let i=0; i < units.length; i++) {
    if (units[i]['company'] !== undefined && units[i]['company'] !== null) {
      companies.push(units[i]['company'])
    }
  }

  // GET /api/v1/companies?name=[partial-query]
  if (req.query.name) {
    const company = companies.find(company => company['name'] == req.query.name)
    res.json({ status, company })
  }

  // GET /api/v1/companies?employees_lte=[integer]
  if (req.query.employees_lte) {
    const companies_lte = []
    for(let i=0; i < companies.length; i++) {
      if (companies[i].employees.length <= req.query.employees_lte) {
        companies_lte.push(companies[i])
      }
    }
    res.json({ status, companies_lte })
  }

  // GET /api/v1/companies?employees_gte=[integer]
  if (req.query.employees_gte) {
    const companies_gte = []
    for(let i=0; i < companies.length; i++) {
      if (companies[i].employees.length >= req.query.employees_gte) {
        companies_gte.push(companies[i])
      }
    }
    res.json({ status, companies_gte })
  }

  // TODO: Finish two routes
  // GET /api/v1/employees?name=[partial-query]
  // if (req.query.name) {
  //   const employeesNameMatch = []
  //   for(let i=0; i < companies.length; i++) {
  //     const employees = companies[i]['employees']
  //     for(let i=0; i < employees.length; i++) {
  //       const fullName = employees[i]['first_name'] + " " + employees[i]['last_name']
  //       console.log(fullName.match(req.query.name))

  //     }
  //   }
  //   res.json({ status, companies })
  // }

  // GET /api/v1/employees?birthday=[date]


  res.json({ status, companies })
})

module.exports = router