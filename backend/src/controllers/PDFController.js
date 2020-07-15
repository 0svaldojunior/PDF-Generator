const pdf = require('html-pdf');
const crypto = require('crypto');
const aws = require('aws-sdk');
const connection = require('../database/connection');

const s3Client = new aws.S3();

const pdfTemplateSeal = require('../documents/Complete/Seal');
const pdfTemplateNotSeal = require('../documents/Complete/NotSeal');
const pdfSimpleTemplateSeal = require('../documents/Simple/Seal');
const pdfSimpleTemplateNotSeal = require('../documents/Simple/NotSeal');

var fileName = '';

crypto.randomBytes(16, (error, hash) => {
  if(error) console.log(error);

  fileName = `${hash.toString('hex')}-`;
});

module.exports = {
  async post (request, response) {
    const config = {
      border: 0,
      format: 'A4',
      orientation: 'landscape'
    };
    var template;
    
    if(request.body.complet === 'Completo') {
      template = request.body.seal === 'Sim' ? pdfTemplateSeal : pdfTemplateNotSeal;
    } else {
      template = request.body.seal === 'Sim' ? pdfSimpleTemplateSeal : pdfSimpleTemplateNotSeal;
    }

    await pdf.create(template(request.body), config)
      .toStream((err, stream) => {
        if(err) console.log(err);
        var params = {
          Body: stream,
          ACL: 'public-read',
          Bucket: 'vision-certificates',
          Key: (fileName + request.body.pdfName),
          ContentType: 'application/pdf',
        };
        s3Client.upload(params, function(err, data) {
          console.log(data);
          return response.json({ 
            date: request.body.date,
            complet: request.body.complet === 'Completo' ? true : false,
            send: false,
            seal: request.body.seal === 'Sim' ? true : false,
            author: request.body.author,
            course: request.body.course,
            student_name: request.body.studentName,
            student_mail: request.body.studentMail,
            url: data.Location 
          });
        });
      });
  },

  async get(request, response) {
    response.sendFile(fileName, { root: './src/certificates' });
  },

  async idGet(request, response) {
    const { nameFile } = request.query;
    console.log(nameFile);
    response.sendFile(nameFile, { root: './src/certificates' });
  },
}