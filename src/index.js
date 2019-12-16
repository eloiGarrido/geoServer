const { port } = require('./config')
const server = require('./server')
const database = require('./database')

database.connect()

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

module.exports = server
