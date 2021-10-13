const nodemailer = require('nodemailer');

const transportOptions = {
  port: 465,
  host: "smtp.gmail.com",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    },
  secure: true,
};

const mailer = nodemailer.createTransport(transportOptions);

const mailWithDefaults = (to, callback, options={}) => {
  const mailData = {
    from: process.env.MAILER_EMAIL,
    to,
    subject: 'Hello from https://mhummer-cse341-bookstore.herokuapp.com',
    text: 'Hello!',
    html: '<p>Hello!</p>',
    ...options,
  };

  const handler = callback || function (err, info) {
   if(err){
     console.error(err);
   } else{
     console.log(info);
   }
};

  mailer.sendMail(mailData, handler);
};

module.exports = {
  mailer,
  mailWithDefaults,
};
