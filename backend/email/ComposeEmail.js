const nodemailer = require('nodemailer');
const { userName, password } = require('../config')
const ComposeEmail = (clientEmail) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: userName,
                pass: password,
            }
        })
        let mailOptions =
        {
            "from": "gemstones321@gmail.com",
            "to": clientEmail,
            "subject": 'Nodemailer Project',
            "text": 'Hi from your nodemailer project'
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log("Error " + err);
            }
        });
    } catch (err) {
        console.log(err)
    }
}
module.exports = ComposeEmail;