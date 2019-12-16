const { validationResult } = require('express-validator')
const { ErrorHandler } = require('../middleware/error')

const handleValidationError = (req) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ErrorHandler(422, errors.errors)
  }
}

const validationWrapper = (req, res, next, fn) => {
  try {
    // Validate input
    handleValidationError(req)
    fn(req, res)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  validationWrapper
}
