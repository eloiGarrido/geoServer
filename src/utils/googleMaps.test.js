const googleMaps = require('./googleMaps')

describe('getClient()', () => {
  it('should return a googleMaps client instance', () => {
    const client = googleMaps.getClient()
    expect(client).toBeDefined()
  })
  it('should return the same google client instance', () => {
    const client = googleMaps.getClient()
    const client2 = googleMaps.getClient()

    expect(client).toBeDefined()
    expect(client2).toBeDefined()
    expect(client).toEqual(client2)
  })
})

describe('searchByAddress()', () => {
  it('should return an error if address is wrong', async () => {
    const addressObj = {}
    try {
      await googleMaps.searchByAddress(addressObj)
    } catch (e) {
      expect(e).toMatch('error')
    }
  })
  it('should return a successful response object', async () => {
    const addressObj = {
      street: ' Gran Via de les Corts Catalanes',
      streetNumber: '129-131',
      town: 'Barcelona',
      postalCode: '08014',
      country: 'Spain'
    }

    const result = await googleMaps.searchByAddress(addressObj)
    expect(result.json.status).toEqual('OK')
  })
})

describe('checkAddress()', () => {
  it('should fail if results has length different than 1', () => {
    const addressResponse = {
      results: [1, 2]
    }
    expect(() => {
      googleMaps.checkAddress(addressResponse)
    }).toThrow()
  })
  it('should fail if response status is not OK', () => {
    const addressResponse = { status: 'ERROR' }
    expect(() => {
      googleMaps.checkAddress(addressResponse)
    }).toThrow()
  })
  it('should return true if address is valid', () => {
    expect(() => {
      googleMaps.checkAddress(responseExample)
    }).not.toThrow()
  })
})

describe('getCoordinates()', () => {
  it('should throw error if input has no property geometry', () => {
    expect(() => {
      googleMaps.getCoordinates({ results: [{ result: 'ok' }] })
    }).toThrow('Missing geometry response data')
  })
  it('should return location object', () => {
    const addressResponse = {
      results: [
        {
          geometry: {
            location: {
              lat: 41.3655946,
              lng: 2.1359212
            }
          }
        }
      ]
    }
    const { lat, lng } = googleMaps.getCoordinates(addressResponse)
    expect(lat).toEqual(addressResponse.results[0].geometry.location.lat)
    expect(lng).toEqual(addressResponse.results[0].geometry.location.lng)
  })
})

const responseExample = {
  results: [
    {
      address_components: [
        {
          long_name: '129',
          short_name: '129',
          types: [
            'street_number'
          ]
        },
        {
          long_name: 'Gran Via de les Corts Catalanes',
          short_name: 'Gran Via de les Corts Catalanes',
          types: [
            'route'
          ]
        },
        {
          long_name: 'Barcelona',
          short_name: 'Barcelona',
          types: [
            'locality',
            'political'
          ]
        },
        {
          long_name: 'Barcelona',
          short_name: 'Barcelona',
          types: [
            'administrative_area_level_2',
            'political'
          ]
        },
        {
          long_name: 'Cataluña',
          short_name: 'CT',
          types: [
            'administrative_area_level_1',
            'political'
          ]
        },
        {
          long_name: 'Spain',
          short_name: 'ES',
          types: [
            'country',
            'political'
          ]
        },
        {
          long_name: '08014',
          short_name: '08014',
          types: [
            'postal_code'
          ]
        }
      ],
      formatted_address: 'Gran Via de les Corts Catalanes, 129, 08014 Barcelona, Spain',
      geometry: {
        location: {
          lat: 41.3655946,
          lng: 2.1359212
        },
        location_type: 'ROOFTOP',
        viewport: {
          northeast: {
            lat: 41.3669435802915,
            lng: 2.137270180291502
          },
          southwest: {
            lat: 41.36424561970851,
            lng: 2.134572219708498
          }
        }
      },
      place_id: 'ChIJyzrT7pmYpBIRerdFxYTBskU',
      plus_code: {
        compound_code: '948P+69 Barcelona, Spain',
        global_code: '8FH4948P+69'
      },
      types: [
        'street_address'
      ]
    }
  ],
  status: 'OK'
}
