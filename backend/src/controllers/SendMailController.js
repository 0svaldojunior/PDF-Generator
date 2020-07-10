require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports ={
  async sendMail(request, response) {
    const { to, subject, text, filename, path } = request.body;

    var transporter = nodemailer.createTransport({
      host: '',
      service: '',
      port: 587,
      secure: true,
      auth:{
        user: process.env.MAIL,
        pass: process.env.PASSWORD
      }
    });
    
    var mail = {
      from: process.env.MAIL,
      to,
      subject,
      text,
      attachments: [
        {
          filename,
          path,
        }
      ]
    };
    
    transporter.sendMail(mail, (error) => {
      if(error) {
        console.log(error);
      }
    });
    
  }
};