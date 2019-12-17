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

const hasPrecipitation = (weatherObj) => {
  const precipitation = ['rain', 'snow']
  return precipitation.some((kind) => Object.keys(weatherObj).includes(kind))
}

module.exports = {
  getWeatherByCoordinates,
  hasPrecipitation
}
