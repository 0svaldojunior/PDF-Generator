const crypto = require('crypto');

const document = require('../documents/Documents');

var fileName = '';

crypto.randomBytes(16, (error, hash) => {
  if(error) console.log(error);

  fileName = `${hash.toString('hex')}-`;
});

module.exports = {
  async post (request, response) {
    return await document.pdfGenerator(request.body, fileName, response);
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