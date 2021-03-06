const express = require('express')
const { validateAddress, validateSchedule } = require('./input-validation')
const router = express.Router()
const { isAddressCorrect, getWeatherByAddress, checkAndGetWeather, monitorWeather } = require('./geoconfig')
const { validationWrapper } = require('../../utils/api-response')

/**
 * GET v1/status
 */
router.get('/status', async (req, res) => {
  res.send('OK')
})

/**
 * POST v1/validate
 * Receives an address and validates if it's valid. Expects {street, streetNumber, town, postalCode, country}
 */
router.post('/validate-address', validateAddress, (req, res, next) => {
  validationWrapper(req, res, next, isAddressCorrect)
})

/**
 * POST v1/current-weather
 * Received a latitude and longitude and returns the weather of the address
 */
router.post('/current-weather', (req, res, next) => {
  validationWrapper(req, res, next, getWeatherByAddress)
})

/**
 * POST v1/address-to-weather
 * Receives an address, validates it and returns the weather
 */
router.post('/address-to-weather', validateAddress, (req, res, next) => {
  validationWrapper(req, res, next, checkAndGetWeather)
})

/**
 * POST /v1/monitor
 * Enables periodic weather monitor and optionally enables schedule
 */
router.post('/monitor', validateSchedule, (req, res, next) => {
  validationWrapper(req, res, next, monitorWeather)
})

module.exports = router
