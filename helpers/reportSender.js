const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'email-smtp.us-east-1.amazonaws.com',
  port: 25,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME, 
    pass: process.env.SMTP_PASSWORD, 
  },
});

const mailOptions = {
  from: process.env.EMAIL_SENDER,
  to: process.env.EMAIL_RECEIVER,
  subject: 'GitHub "Pet-projects" test report ',
  text: 'Here you can find actual test report -  https://vadimperkin.github.io/pet-project', 
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error occurred: ' + error.message);
  }
  console.log('Email sent: ' + info.response);
});
