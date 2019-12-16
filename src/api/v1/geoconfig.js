const { searchByAddress, checkAddress, getCoordinates } = require('../../utils/googleMaps')
const { getWeatherByCoordinates } = require('../../utils/openWeather')

const isAddressCorrect = async (req, res) => {
  // Search address via Google Geocoding
  const { json: response } = await searchByAddress(req.body.address)
  // Validate resulting address
  checkAddress(response)
  res.status(200).send('Correct address')
}

const getWeatherByAddress = async (req, res) => {
  // Search address via Google Geocoding
  const { json: response } = await searchByAddress(req.body.address)
  // Fetch weather
  const { lat, lng } = getCoordinates(response)
  const weather = await getWeatherByCoordinates(lat, lng)
  res.status(200).json(weather)
}

const checkAndGetWeather = async (req, res) => {
  // Search address via Google Geocoding
  const { json: response } = await searchByAddress(req.body.address)
  // Validate address
  checkAddress(response)
  // Fetch weather
  const { lat, lng } = getCoordinates(response)
  const weather = await getWeatherByCoordinates(lat, lng)
  res.status(200).json(weather)
}

module.exports = {
  checkAndGetWeather,
  getWeatherByAddress,
  isAddressCorrect
}
