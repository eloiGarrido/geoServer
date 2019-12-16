const inputValidation = require('./inputValidation')

describe('validateAddress', () => {
  it('should return body validators for address field', () => {
    expect(inputValidation.validateAddress).toHaveLength(5)
  })
})
