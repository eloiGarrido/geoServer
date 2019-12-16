class ErrorHandler extends Error {
  constructor (statusCode, message) {
    super()
    this.statusCode = statusCode
    console.log('message.isArray()', Array.isArray(message))
    if (Array.isArray(message)) {
      console.log('IS array')
      this.message = message.map(error => {
        return `${error.param}: ${error.msg}`
      }).join(', ')
    } else {
      this.message = message
    }
  }
}

const handleError = (err, res) => {
  console.log('handleError', err)
  const statusCode = err.statusCode || 500
  const message = err.message || 'Error processing query'
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  })
}

module.exports = {
  ErrorHandler,
  handleError
}
