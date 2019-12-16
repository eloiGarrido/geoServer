const { openWeatherApiKey } = require('../config')
const fetch = require('node-fetch')

/**
 * Fetch current weather from OpenWeather endpoint
 * @param {string} lat Latitude
 * @param {string} long Longitude
 */
const getWeatherByCoordinates = async (lat, long) => {
  const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${openWeatherApiKey}`)
  return data.json()
}

module.exports = {
  getWeatherByCoordinates
}
