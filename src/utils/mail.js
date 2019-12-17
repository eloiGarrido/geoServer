const nodemailer = require('nodemailer')
const { email } = require('../config')

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

const sendMail = async (message = 'Testing Nodemailer') => {
  // create a nodemailer transporter using smtp
  const transporter = nodemailer.createTransport(transporterGmail)
  // send mail using transporter
  mail.text = message
  const info = await transporter.sendMail(mail)

  console.log(`Preview: ${nodemailer.getTestMessageUrl(info)}`)
}

module.exports = {
  sendMail
}
