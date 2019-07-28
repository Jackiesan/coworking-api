const mongoose = require('mongoose')
const validateEmail = function(email) {
  const validEmail = /^\S+@\S+\.\S+$/
  return validEmail.test(email)
};

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact_email: {
    type: String,
    required: true,
    validate: [validateEmail, 'Email address is not valid']
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
      required: true,
      validate: [validateEmail, 'Email address is not valid']
    }
  }]
})

module.exports = schema