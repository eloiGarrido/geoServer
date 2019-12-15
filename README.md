# Geocoding and address query server

ExpressJS server (node v12.13.1) which allows to validate and retrieve basic geographic data. Uses Google Maps Geocoding API and Open Weather API to validate, retrieve coordinates and fetch weather data from user input addresses. 

### Includes

- [ExpressJS](https://expressjs.com)
- [NodeJS](https://nodejs.org/en/)
- [Mongoose](http://mongoosejs.com/docs/guide.html)
- [Nodemon](https://nodemon.io/)
- [Jest](https://jestjs.io/en/)
- [Google Maps Geocoding](https://developers.google.com/maps/documentation/geocoding/start)
- [Open Weather API](https://developers.google.com/maps/documentation/geocoding/start)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

A step by step series that will tell you how to get a development env running

```bash
git clone https://github.com/eloiGarrido/geoServer.git
cd geoServer
npm install
```

### Run at local server

Setup a `.env` file and fill in the Google Geocoding API key to allow the server to request services from Google Maps. 
```bash
touch .env
nano .env
GOOGLE_API_KEY='<Google Ceocoding API key>'
```
Afterwards, execute start script to spin up a local server at `localhost:3030`
```bash
npm run start
```

## Endpoints

### Validate address

### Get weather information

### Get weather at address