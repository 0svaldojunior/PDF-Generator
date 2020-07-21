require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports ={
  async sendMail(request, response) {
    const { to, subject, text } = request.body;

    var transporter = nodemailer.createTransport({
      pool: true,
      host: process.env.SERVICE_MAIL,
      port: 465,
      secure: true,
      auth:{
        user: process.env.USER_MAIL,
        pass: process.env.PASSWORD_MAIL
      }
    });
    
    var mailOptions = {
      from: process.env.USER_MAIL,
      to,
      subject,
      html: text,
      
    };
    transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      console.log(error);
    } else {
      console.log(`Email send:\n ${info.response}`);
    }
    });
    
  }
};