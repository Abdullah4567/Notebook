const nodemailer = require('nodemailer');
const { userName, password } = require('../config')

const emailTemplate = (name) => `<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    <style>
      
    </style>
  </head>
  <body>
        <div style="margin:20px">
        <h1 style="color:blueviolet; text-align: center; padding-top:5px;">Welcome to NoteBook
        </h1>
        <div style="padding-left:10px; font-size: large;">
            <span style="padding-left:5px;">Dear <span style="color:blue;">Mr.${name}</span></span>
            <p style="padding-left:10px">
                Thank you For creating account. This is your NoteBook on Cloud. Here you can have your important
                notes.
            </p>
            <h3>Following are our services</h3>
            <ul>
                <li>You can Create your Notes </li>
                <li>You can Modify your Notes </li>
                <li>You can Update your Notes </li>
                <li>You can Delete your Notes </li>
                <li>You can Generate PDF of your Notes </li>
            </ul>
        </div>
      </div>
  </body>
</html>`;
const ComposeEmail = (clientEmail, name) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: userName,
        pass: password,
      }
    })
    const message = emailTemplate(name)
    let mailOptions =
    {
      "from": "gemstones321@gmail.com",
      "to": clientEmail,
      "subject": 'Welcome to NoteBook',
      "html": message
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