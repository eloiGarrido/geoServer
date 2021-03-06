require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3030,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/geoconfig',
  googleApiKey: process.env.GOOGLE_API_KEY,
  openWeatherApiKey: process.env.OPEN_WEATHER_API_KEY,
  email: process.env.EMAIL,
  cronPeriod: process.env.CRON_PERIOD || '0 * * * *'
}
