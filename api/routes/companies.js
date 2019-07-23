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

  res.json({ status, companies })
})

module.exports = router