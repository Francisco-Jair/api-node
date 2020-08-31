const config = require('../config')
const sendgrid = require('sendgrid')(config.sendgridKey)

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'teste@teste.com',
        subject: subject,
        html: body
    })
}