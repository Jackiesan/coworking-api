const mongoose = require('mongoose')

const schema = new mongoose.Schema({
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
})

module.exports = schema