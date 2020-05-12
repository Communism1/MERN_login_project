const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UpdateSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: true
  },
})

module.exports = Update = mongoose.model('update', UpdateSchema)
