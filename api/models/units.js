const mongoose = require('mongoose')
const Schema = mongoose.Schema
const companySchema =  require('./company')

var schema = new Schema({
  kind: {
    type: String,
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  special_monthly_offer: Number,
  company: companySchema
})

module.exports = mongoose.model('Units', schema)

