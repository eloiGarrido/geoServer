const cron = require('node-cron')
const { cronPeriod } = require('../config')

let startSchedule
let stopSchedule
let cronJob

const createCronJob = (fn) => {
  cronJob = cron.schedule(cronPeriod, fn)
}

const scheduleCronJob = (start, stop, cron) => {
  startSchedule = cron.schedule(start, () => {
    cronJob.start()
  })
  stopSchedule = cron.schedule(stop, () => {
    cronJob.stop()
  })
}

const disableSchedule = () => {
  startSchedule.stop()
  stopSchedule.stop()
}

module.exports = {
  createCronJob,
  disableSchedule,
  scheduleCronJob
}
