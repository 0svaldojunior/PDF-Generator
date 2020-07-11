const pdf = require('html-pdf');
const routes = require('../routes');

const pdfTemplateSeal = require('../documents/Complete/Seal');
const pdfTemplateNotSeal = require('../documents/Complete/NotSeal');
const pdfSimpleTemplateSeal = require('../documents/Simple/Seal');
const pdfSimpleTemplateNotSeal = require('../documents/Simple/NotSeal');

var fileName = '';
var fileNameWithPath;
var req;
var res;

module.exports = {
  async post(request, response) {
    const config = {
      border: 0,
      format: 'A4',
      orientation: 'landscape'
    };

    fileName = `Certificate-${request.body.studentName}-${request.body.secondsNow}.pdf`;
    fileNameWithPath = `./src/certificates/${fileName}`;
    req = request;
    res = response;
    
    if(request.body.verse === 'Completo') {
      if(request.body.seal === 'Sim') {
        await pdf.create(pdfTemplateSeal(request.body), config)
        .toFile(fileNameWithPath, (error) => {
          if(error) {
            response.send(Promise.reject());
          } 
          response.send(Promise.resolve());
        });
      } else {
        await pdf.create(pdfTemplateNotSeal(request.body), config)
        .toFile(fileNameWithPath, (error) => {
          if(error) {
            response.send(Promise.reject());
          } 
          response.send(Promise.resolve());
        });
      }
    } else {
      if(request.body.seal === 'Sim') {
        await pdf.create(pdfSimpleTemplateSeal(request.body), config)
        .toFile(fileNameWithPath, (error) => {
          if(error) {
            response.send(Promise.reject());
          } 
          response.send(Promise.resolve());
        });
      } else {
        await pdf.create(pdfSimpleTemplateNotSeal(request.body), config)
        .toFile(fileNameWithPath, (error) => {
          if(error) {
            response.send(Promise.reject());
          } 
          response.send(Promise.resolve());
        });
      }
    }

    
  },

  async get(request, response) {
    response.sendFile(fileName, { root: './src/certificates' });
  },
}