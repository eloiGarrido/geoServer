const cron = require('node-cron')
const { cronPeriod } = require('../config')
const parser = require('cron-parser')

let startSchedule
let stopSchedule
let cronJob

/**
 * Creates a cron job from function
 * @param {*} fn
 */
const createCronJob = async (fn) => {
  checkCron(cronPeriod)
  cronJob = cron.schedule(cronPeriod, await fn)
}

/**
 * Enabled cron automatic start and stop
 * @param {string} start
 * @param {string} stop
 * @param {*} cron
 */
const scheduleCronJob = (start, stop, cron) => {
  checkCron(start)
  checkCron(stop)
  startSchedule = cron.schedule(start, () => {
    cronJob.start()
  })
  stopSchedule = cron.schedule(stop, () => {
    cronJob.stop()
  })
  console.info(`Cron job schedule enabled. Start: ${start}, stop: ${stop}`)
}

/**
 * Disable cron automatic start and stop
 */
const disableSchedule = () => {
  startSchedule.stop()
  stopSchedule.stop()
  console.info('Cron job schedule disabled')
}

/**
 * Validates cron expression
 * @param {string} cronString
 */
const checkCron = (cronString) => {
  parser.parseExpression(cronString)
}

module.exports = {
  createCronJob,
  disableSchedule,
  scheduleCronJob
}
