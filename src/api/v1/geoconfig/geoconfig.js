const { searchByAddress, checkAddress, getCoordinates, formatAddress } = require('../../../utils/google-maps')
const { getWeatherByCoordinates, hasPrecipitation } = require('../../../utils/open-weather')
const AddressModel = require('./models/address-model')
const { sendMail } = require('../../../utils/mail')
const { createCronJob, scheduleCronJob } = require('../../../utils/cron')

let addressCache = []
let updateCache = true

/**
 * Validates if address is correct
 * @param {object} req
 * @param {object} res
 */
const isAddressCorrect = async (req, res) => {
  // Search address via Google Geocoding
  const { json: response } = await searchByAddress(formatAddress(req.body.address))
  // Validate resulting address
  checkAddress(response)
  res.status(200).send('Correct address')
}

/**
 * Search weather at provided address
 * @param {object} req
 * @param {object} res
 */
const getWeatherByAddress = async (req, res) => {
  // Search address via Google Geocoding
  const { json: response } = await searchByAddress(formatAddress(req.body.address))
  // Fetch weather
  const { lat, lng } = getCoordinates(response)
  const weather = await getWeatherByCoordinates(lat, lng)
  res.status(200).json(weather)
}

/**
 * Search address, validates and gets weather information
 * @param {object} req
 * @param {object} res
 */
const checkAndGetWeather = async (req, res) => {
  // Search address via Google Geocoding
  const address = formatAddress(req.body.address)
  const { json: response } = await searchByAddress(address)
  // Validate address
  checkAddress(response)
  // Fetch weather
  const { lat, lng } = getCoordinates(response)
  const weather = await getWeatherByCoordinates(lat, lng)
  storeAddress(address, lat, lng)
  res.status(200).json(weather)
}

/**
 * Fetch weather information for all stored addresses
 */
const checkPrecipitation = () => {
  getStoredAddresses().then(addresses => {
    if (!addresses || addresses.length === 0) {
      console.info('No precipitation in any of the saved localities')
    }
    for (const address of addresses) {
      getWeatherByCoordinates(address.latitude, address.longitude).then(weather => {
        if (hasPrecipitation(weather)) {
          sendMail(`Precipitation at ${address.address}\n ${JSON.stringify(weather)}`).then()
        }
      })
    }
  }).catch(e => {
    console.error(e)
  })
}

/**
 * Trigger weather monitoring cron job
 */
const monitorPrecipitation = () => {
  createCronJob(() => {
    checkPrecipitation()
  })
}

/**
 * Fetch addresses from either database or cache
 */
const getStoredAddresses = async () => {
  if (addressCache.length === 0 || updateCache) {
    const addresses = await AddressModel.find()
    storeAddressesToCache(addresses)
    return addresses
  }
  return AddressModel.find()
}

/**
 * Saves address into database
 * @param {string} address
 * @param {string} lat
 * @param {string} lng
 */
const storeAddress = async (address, lat, lng) => {
  const data = {
    address,
    latitude: lat,
    longitude: lng
  }
  const options = { upsert: true, new: true }
  updateCache = true // flag cache as outdated
  await AddressModel.findOneAndUpdate(data, data, options)
}

/**
 * Stores addresses fetch from database into cache
 * @param {object[]} addresses
 */
const storeAddressesToCache = (addresses) => {
  addressCache = addresses
  updateCache = false
}

/**
 * Starts cron job that monitor stored addresses for precipitation
 * @param {object} req
 * @param {object} res
 */
const monitorWeather = (req, res) => {
  monitorPrecipitation()
  // Schedule cron job
  if (req.body.start || req.body.stop) {
    scheduleCronJob(req.body.start, req.body.stop)
  }
  res.status(200).send('Monitoring weather')
}

module.exports = {
  checkAndGetWeather,
  checkPrecipitation,
  getStoredAddresses,
  getWeatherByAddress,
  isAddressCorrect,
  monitorWeather
}
