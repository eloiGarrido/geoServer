const express = require('express')
const { validationResult } = require('express-validator')
const {
  validateAddress,
  validateCoordinates
} = require('./inputValidation')
const router = express.Router()
const { searchByAddress, checkAddress } = require('../../utils/googleMaps')

/**
 * GET v1/status
 */
router.get('/status', (req, res) => {
  res.send('OK')
})

/**
 * POST v1/validate
 * Receives an address and validates if it's valid. Expects {street, streetNumber, town, postalCode, country}
 */
router.post('/validate-address', validateAddress, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { json: response } = await searchByAddress(req.body.address)
  if (checkAddress(response)) {
    res.status(200).send('Correct address')
  }
})

/**
 * POST v1/coordinates-to-weather
 * Received a latitude and longitude and returns the weather of the address
 */
router.post('/coordinates-to-weather', validateCoordinates, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  res.send('Should return the weather at the specific coordinates')
}
)

/**
 * POST v1/address-to-weather
 * Receives an address, validates it and returns the weather
 */
router.post('address-to-weather', (req, res) => {
  console.log('After valAddress')

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  res.send('Should receive an address, validate it and return its weather')
})

module.exports = router
