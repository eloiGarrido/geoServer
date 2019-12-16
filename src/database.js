const mongoose = require('mongoose')
const { mongo } = require('./config')

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`)
  process.exit(-1)
})

mongoose.connection.on('open', () => {
  console.error('MongoDB connection successful')
})

exports.connect = () => {
  mongoose.connect(mongo.uri, {
    keepAlive: 1,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  return mongoose.connection
}
