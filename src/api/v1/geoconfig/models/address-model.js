
const mongoose = require('mongoose')

const Address = new mongoose.Schema({
  address: { type: String },
  latitude: { type: String },
  longitude: { type: String }
})

const model = mongoose.model('Address', Address)

module.exports = model
