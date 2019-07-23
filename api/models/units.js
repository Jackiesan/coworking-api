var mongoose = require('mongoose')
var Schema = mongoose.Schema

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
  company: {
    name: {
      type: String,
      required: true
    },
    contact_email: {
      type: String,
      required: true
    },
    employees: [{
      first_name: {
        type: String,
        required: true
      },
      last_name: {
        type: String,
        required: true
      },
      preferred_name: String,
      position: String,
      birthday: String,
      email: {
        type: String,
        required: true
      }
    }]
  }
})

module.exports = mongoose.model('Units', schema)

