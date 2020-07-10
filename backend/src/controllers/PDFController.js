const pdf = require('html-pdf');

const pdfTemplateSeal = require('../documents/Complete/Seal');
const pdfTemplateNotSeal = require('../documents/Complete/NotSeal');
const pdfSimpleTemplateSeal = require('../documents/Simple/Seal');
const pdfSimpleTemplateNotSeal = require('../documents/Simple/NotSeal');

module.exports = {
  async post(request, response) {
    const config = {
      border: 0,
      format: 'A4',
      orientation: 'landscape'
    };

    if(request.body.verse === 'Completo') {
      if(request.body.seal === 'Sim') {
        await pdf.create(pdfTemplateSeal(request.body), config)
        .toFile('./src/documents/assets/result.pdf', (error) => {
          if(error) {
            response.send(Promise.reject());
          } 
          response.send(Promise.resolve());
        });
      } else {
        await pdf.create(pdfTemplateNotSeal(request.body), config)
        .toFile('./src/documents/assets/result.pdf', (error) => {
          if(error) {
            response.send(Promise.reject());
          } 
          response.send(Promise.resolve());
        });
      }
    } else {
      if(request.body.seal === 'Sim') {
        await pdf.create(pdfSimpleTemplateSeal(request.body), config)
        .toFile('./src/documents/assets/result.pdf', (error) => {
          if(error) {
            response.send(Promise.reject());
          } 
          response.send(Promise.resolve());
        });
      } else {
        await pdf.create(pdfSimpleTemplateNotSeal(request.body), config)
        .toFile('./src/documents/assets/result.pdf', (error) => {
          if(error) {
            response.send(Promise.reject());
          } 
          response.send(Promise.resolve());
        });
      }
    }

    
  },

  async get(request, response) {
    response.sendFile('result.pdf', { root: './src/documents/assets' });
  }
}