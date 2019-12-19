
const { body } = require('express-validator')

const addressFields = ['street', 'streetNumber', 'town', 'postalCode', 'country']
const validateAddress = addressFields.map(field => {
  return body(`address.${field}`).not().isEmpty().isLength({ min: 1, max: 512 }).stripLow().trim()
})

const validateSchedule = [
  body('cron.start').optional().isLength({ min: 9, max: 128 }).stripLow().trim(),
  body('cron.stop').optional().isLength({ min: 9, max: 128 }).stripLow().trim()
]

module.exports = {
  validateAddress,
  validateSchedule
}
