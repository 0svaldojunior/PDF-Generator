const PDFDocument = require('pdfkit');
const fs = require('fs');
const htmlToText = require('html-to-text');
const blobStream = require('blob-stream');
const aws = require('aws-sdk');
const s3Client = new aws.S3();

const BGSeal = './src/assets/img/BG-SealMaster.png';
const BGNotSeal = './src/assets/img/BG-NotSealMaster.png';
const PrintBGSeal = './src/assets/img/Print-BG-SealMaster.png';
const PrintNotBGSeal = './src/assets/img/Print-BG-NotSealMaster.png';
const BGHistoric = './src/assets/img/BG-Historic.png';
const BGStudent = './src/assets/img/BG-Student.png';

module.exports = {
  pdfGenerator({studentName, studentCPF, studentMail, note, date, complet, signature, seal, titration, thisCourse, course, pdfName, author, registerNumber}, fileName, response) {
    var dates = `${date}`;
    var name = `${studentName}`;
    var courseName = `${course}`;
    var titrations = `${titration}`;
    var sizeSpaceTitrations;
    if(titrations.length === 25) {
      sizeSpaceTitrations = 495 - (25 * 4.1);
    } else {
      sizeSpaceTitrations = 495 - ((titrations.length + 24) * 4.1);
    }
    var workload = `${thisCourse.workload}`;
    var cpf = `${studentCPF}`;
    var notes = `${note}`;
    var content = htmlToText.fromString(`${thisCourse.content}`, {wordwrap:130});
    var sizeName = 440;
    if(name.length === 9){
      sizeName = 440;
    } else if(name.length < 9) {
      var diferenca = 9 - name.length;
      sizeName = 440 + (diferenca * 5.45);
    } else {
      var diferenca = name.length - 9;
      sizeName = 440 - (diferenca * 5.45);
    }
    var template;
    var splitRegisterNumber = registerNumber.split('-');
    console.log(splitRegisterNumber);
    var newRegisterNumber = `${splitRegisterNumber[0].trim()}-${splitRegisterNumber[1].trim()}`;

    var sizeCourseName;
    if(courseName.length === 1) {
      sizeCourseName = 490;
    } else {
      sizeCourseName = 490 - (courseName.length * 4.85);
    }

    if(seal === 'Sim') {
      template = signature === 'Sim' ? BGSeal : PrintBGSeal;
    } else {
      template = signature === 'Sim' ? BGNotSeal : PrintNotBGSeal;
    }

    const pdf = new PDFDocument({
      size: 'A4',
      layout: 'landscape',
      margins: {left: 0.0, bottom: 0.0}
    });

    pdf.image(template, 0, 0, {width: 841.89, height: 595.28})
    pdf.font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 58)
      .fill('#293770')
      .text('CERTIFICADO', 305.945, 65.0)
      .font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 28)
      .text('___________________________________', 285.945, 95.0)
      .moveUp(1.5);

    pdf.font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 10)
      .fill('#fff')
      .text(`             Registro da Escola`, 10.0, 490.0)
      .text('               ABED Nº 14918', 10.0, 505.0)
      .text('          SBHOLOS Nº SBJ001/16', 10.0, 520.0)
      .text('___________________________________\n', 10.0, 535.0)
      .text('Instituto Terceira Visão T&D Ltda.', 10.0, 555.0)
      .text(`     CNPJ 17.016.253/0001-56`, 10.0, 570.0);

    pdf.font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 15)
      .fill('#292929')
      .text(`${dates}`, 580.0, 450.0);

    pdf.font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 16)
      .fill('#262626')
      .text('Certificamos que', 440.0, 175)
      .font('./src/assets/fonts/DejaVuSerifCondensed-Bold.ttf', 18.5)
      .fill('#293770')
      .text(`${name.toUpperCase()}`, (sizeName), 215)
      .font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 16)
      .fill('#262626')
      .text('Concluiu o curso Livre de', 495 - (25 * 3.5), 250)
      .font('./src/assets/fonts/DejaVuSerifCondensed-Bold.ttf', 16.5)
      .text(`${courseName.toUpperCase()},`, sizeCourseName, 275)
      .font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 16)
      .text(`com a duração de ${workload},`, 495 - ((17 + workload.length) * 3.75), 300);14
      

    if(titrations.length < 1) {
      pdf.font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 16)
        .text(`tendo alcaçado excelente nível de aproveitamento.`, 495 - (49 * 3.70), 325)
        .font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 16)
        .text(`Registro do Certificado:${newRegisterNumber}.`, 495 - ((24 + newRegisterNumber.length) * 3.70), 350);
    } else {
      pdf.font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 16)
        .text(`tendo alcaçado excelente nível de aproveitamento,`, 495 - (49 * 3.70), 325)
        .font('./src/assets/fonts/DejaVuSerifCondensed-Bold.ttf', 16)
        .text(`obtendo a Titulação de ${titrations}.`, sizeSpaceTitrations, 350)
        .font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 16)
        .text(`Registro do Certificado:${newRegisterNumber}.`, 495 - ((24 + newRegisterNumber.length) * 3.70), 375);
    }

    if(complet === 'Completo') {
      pdf.addPage({
        size: 'A4',
        layout: 'landscape',
        margins: {bottom: 0}
      });
      pdf.image(BGStudent, 0, 0, {width: 841.89, height: 595.28})
      pdf.font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 16)
        .fill('#262626')
        .text(`CURSO LIVRE DE ${courseName.toUpperCase()}`, 420 - ((15 + courseName.length) * 4.6), 120);

      pdf.font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 12)
        .fill('#262626')
        .text(`NOME: ${name}`, 115, 200)
        .text(`CURSO: ${courseName}`, 115, 230)
        .text(`TOTAL DE HORAS AULA: ${workload}`, 115, 260)
        .text(`REGISTRO: ${thisCourse.register_number}`, 115, 290)
        .text(`CPF: ${cpf}`, 580, 200)
        .text('FREQUÊNCIA: 100%', 580, 230)
        .text(`NOTA: ${notes}`, 580, 260)
        
      pdf.font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 10)
        .fill('#262626')
        .text('Certificado emitido em conformidade com o Decreto Federal Nº 5.154/04.', 490, 570);
      
      pdf.addPage({
        size: 'A4',
        layout: 'portrait',
        margins: {bottom: 0, left: 5}
      });
      pdf.font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 14)
      .fill('#262626')
      .text(`CURSO LIVRE DE ${courseName.toUpperCase()}`, 300 - ((15 + courseName.length) * 4.15), 40);
      
      pdf.font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 12)
      .fill('#262626')
      .text(`NOME: ${name}`, 21, 90)
      .text(`CURSO: ${courseName}`, 21, 120)
      .text(`TOTAL DE HORAS AULA: ${workload}`, 21, 150)
      .text(`REGISTRO: ${thisCourse.register_number}`, 21, 180)
      .text(`CPF: ${cpf}`, 462, 90)
      .text('FREQUÊNCIA: 100%', 462, 120)
      .text(`NOTA: ${notes}`, 462, 150)

      pdf.font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 9.15)
        .fill('#262626')
        .text('HISTÓRICO DO CURSO', 250 - 18, 210)
        .text(`Foi desenvolvido no Curso Livre de ${courseName}, o seguinte conteudo programático:`, 250 - ((100 + courseName.length) * 1.615), 230)

      pdf.image(BGHistoric, 40, 260, {width: 550, height: 550})
        .text(`${content}`, 30, 260, {
          height: 540,
          width: 540,
          align: 'justify'})
        .rect(20, 250, 560, 560).stroke();

      pdf.font('./src/assets/fonts/DejaVuSerifCondensed.ttf', 10)
        .fill('#262626')
        .text('Certificado emitido em conformidade com o Decreto Federal Nº 5.154/04.', 240, 820);
    }
    
    // pdf.pipe(
    //   fs.createWriteStream('./file.pdf')
    // ).on('finish', () => {
    //   console.log('PDF Close');
    // });
    pdf.end();
    
    var params = {
      Body: pdf,
      ACL: 'public-read',
      Bucket: 'vision-certificates',
      Key: (fileName + pdfName),
      ContentType: 'application/pdf',
    };
    s3Client.upload(params, function(err, data) {
      console.log(data);
      return response.json({ 
        date,
        complet: complet === 'Completo' ? true : false,
        send: false,
        signature: signature === 'Sim' ? true : false,
        seal: seal === 'Sim' ? true : false,
        author: author,
        course: course,
        student_name: studentName,
        student_mail: studentMail,
        signature: signature === 'Sim' ? true : false,
        url: data.Location 
      });
    });
  }
}