
const { body } = require('express-validator')

const addressFields = ['street', 'streetNumber', 'town', 'postalCode', 'country']
const validateAddress = addressFields.map(field => {
  return body(`address.${field}`).not().isEmpty().isLength({ min: 1, max: 512 }).stripLow().trim()
})

const validateCoordinates = []

module.exports = {
  validateAddress,
  validateCoordinates
}
