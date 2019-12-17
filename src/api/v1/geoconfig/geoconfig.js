const { searchByAddress, checkAddress, getCoordinates, formatAddress } = require('../../../utils/google-maps')
const { getWeatherByCoordinates, hasPrecipitation } = require('../../../utils/open-weather')
const AddressModel = require('./models/address-model')
const { sendMail } = require('../../../utils/mail')

const isAddressCorrect = async (req, res) => {
  // Search address via Google Geocoding
  const { json: response } = await searchByAddress(formatAddress(req.body.address))
  // Validate resulting address
  checkAddress(response)
  res.status(200).send('Correct address')
}

const getWeatherByAddress = async (req, res) => {
  // Search address via Google Geocoding
  const { json: response } = await searchByAddress(formatAddress(req.body.address))
  // Fetch weather
  const { lat, lng } = getCoordinates(response)
  const weather = await getWeatherByCoordinates(lat, lng)
  res.status(200).json(weather)
}

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

const storeAddress = async (address, lat, lng) => {
  const data = {
    address,
    latitude: lat,
    longitude: lng
  }
  const options = { upsert: true, new: true }
  await AddressModel.findOneAndUpdate(data, data, options)
}

const getStoredAddresses = async () => {
  return AddressModel.find()
}

const checkPrecipitation = async () => {
  const addresses = await getStoredAddresses()

  for (const address of addresses) {
    const weather = await getWeatherByCoordinates(address.latitude, address.longitude)
    if (hasPrecipitation(weather)) {
      await sendMail(`Precipitation at ${address.address}\n ${JSON.stringify(weather)}`)
    }
  }
}

module.exports = {
  checkAndGetWeather,
  checkPrecipitation,
  getStoredAddresses,
  getWeatherByAddress,
  isAddressCorrect
}
