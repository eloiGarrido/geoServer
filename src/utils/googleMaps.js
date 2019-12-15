const { googleApiKey } = require('../config')
const googleMaps = require('@google/maps')
const assert = require('assert')

let client

const getClient = () => {
  if (client) return client
  client = googleMaps.createClient({
    key: googleApiKey,
    Promise: Promise
  })
  return client
}
// Initialize client on require
client = getClient()

/**
 *
 * @param {object} addressObj
 * @param {string} addressObj.street Street
 * @param {number|string} addressObj.streetNumber Street number
 * @param {string} addressObj.town Town
 * @param {string|number} addressObj.postalCode Postal code
 * @param {string} addressObj.country Country
 */
const formatAddress = (addressObj) => {
  return `${addressObj.street} ${addressObj.streetNumber}, ${addressObj.town} ${addressObj.postalCode}, ${addressObj.country}`
}

/**
 *
 * @param {object} addressObj Address to submit to Google maps for search
 */
const searchByAddress = async (addressObj) => {
  console.log('searchByAddress')
  console.log('   addressObj', addressObj)
  const address = formatAddress(addressObj)
  return client.geocode({ address }).asPromise()
}

/**
 * Validates query response object from Google Maps
 * @param {object} addressResponse Query response object
 * @returns {boolean}
 */
const checkAddress = (addressResponse) => {
  console.log('checkAddress')
  console.log('   addressResponse', addressResponse)

  assert(addressResponse.results.length === 1, 'Multiple results from address') // Enforce we are only getting one response
  assert(addressResponse.status === 'OK', 'Result is not OK, please validate address')
  return true
}

module.exports = {
  getClient,
  searchByAddress,
  checkAddress
}
