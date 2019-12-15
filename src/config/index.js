require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV | 'dev',
  port: process.env.PORT | 3030,
  mongo: { uri: 'mongodb://localhost:27017/addressServer' },
  googleApiKey: process.env.GOOGLE_API_KEY
}
