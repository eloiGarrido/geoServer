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
GOOGLE_API_KEY='<Google Geocoding API key>'
OPEN_WEATHER_API_KEY='<OpenWeather API key>'
EMAIL='<email address>'
```
By default, the server connects to a mongoDB docker instance located at port 27017. In case you want to point to a custom database instance modify environmental variable **MONGO_URI**. To spin up the docker instance execute:
```
docker-compose up
```
Afterwards, execute start script to spin up a local server at `localhost:3030`
```bash
npm run start
```
By default the server runs on port *3030*. This parameter can be customized via the environmental variable **PORT**

## Endpoints

- **/v1/status**: Returns OK if server is up and running
- **/v1/validate-address**: Receives an address and validate if its valid. This address must be in
an object with the properties street, streetNumber, town, postalCode and country.

    Request body example
    ```json
    {
        "address":{
        "street": "Henrietta",
        "streetNumber": "17-18",
        "town": "London",
        "postalCode": "WC2E",
        "country": "United Kingdom"
        }
    }
    ```
- **/v1/current-address**: Receives an address and check the weather at the latitude and
longitude of that address

    Same input as **/v1/validate-address**, example output:
    ```json
    {
    "coord": {
        "lon": -0.12,
        "lat": 51.51
    },
    "weather": [
        {
        "id": 501,
        "main": "Rain",
        "description": "moderate rain",
        "icon": "10d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 284.3,
        "feels_like": 281.23,
        "temp_min": 283.15,
        "temp_max": 285.37,
        "pressure": 995,
        "humidity": 87
    },
    "visibility": 8000,
    "wind": {
        "speed": 4.1,
        "deg": 130
    },
    "rain": {
        "1h": 1.78
    },
    "clouds": {
        "all": 100
    },
    "dt": 1576765212,
    "sys": {
        "type": 1,
        "id": 1414,
        "country": "GB",
        "sunrise": 1576742548,
        "sunset": 1576770740
    },
    "timezone": 0,
    "id": 2643743,
    "name": "London",
    "cod": 200
    }
    ```
- **/v1/monitor**: Enables an automatic query of previously saved address and sends an (virtual) email if any presents any kind of precipitation. An object containing **start** and **stop** cron values can be passed to enable automatic scheduling.
    ```json
    {
        "cron":{
            "start":"30 6 * * *",
            "stop":"30 7 * * *"
        }
    }
    ```

### Deploy to AWS
In order to deploy the app to AWS, an account and a EC2 instance is required.
Navigate to AWS/EC2 and press on launch instance. Select the desired machine configuration (i.e. t2.micro with Ubuntu).

Once the instance is up and running ssh into it and install NodeJS and docker.
```
npm i -g nvm
nvm install v12
```
For docker follow: https://docs.docker.com/install/linux/docker-ce/ubuntu/

Install git and setup the server
```
sudo apt-get install git
git clone https://github.com/eloiGarrido/geoServer.git
cd geoServer
npm install
```
Start the application as explained above. Once is running copy the DNS from your AWS instance page, append the server port (i.e. 3030) and paste it into your browser.
To access the server we need to enable AWS security group. Select **Security Groups** and edit inbound rules and add the **port** as a custom TCP protocol.



