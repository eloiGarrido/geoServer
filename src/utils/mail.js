const nodemailer = require('nodemailer')
const { email } = require('../config')

// ethereal email transporter. It won't send a real email but can be pre-visualized
const transporterGmail = {
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'maud13@ethereal.email',
    pass: '18zxFCgVr7gVKFEuAf'
  }
}

const mail = {
  from: 'foo@example.com',
  to: email,
  subject: 'Weather',
  text: 'Testing Nodemailer'
}

/**
 * Sends (fake) email with message
 * @param {string} message
 */
const sendMail = async (message = 'Testing Nodemailer') => {
  // create a nodemailer transporter using smtp
  const transporter = nodemailer.createTransport(transporterGmail)
  // send mail using transporter
  mail.text = message
  const info = await transporter.sendMail(mail)
  // Print ethereal mail visualizer
  console.log(`Email preview: ${nodemailer.getTestMessageUrl(info)}`)
}

module.exports = {
  sendMail
}
