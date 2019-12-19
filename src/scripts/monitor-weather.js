const { createCronJob } = require('../utils/cron')
const { checkPrecipitation } = require('../api/v1/geoconfig')

const monitorPrecipitation = () => {
  createCronJob(checkPrecipitation())
}

monitorPrecipitation()
