module.exports = ({ studentName, studentCPF, studentMail, note, registerNumber, date, verse, historic, titration, signature, thisCourse }) => {
  const today = new Date();
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
        <style>
          h1 {
            font-weigth: bold;
            font-size: 45px;
            color: #000;
          }

          h2 {
            font-weigth: bold;
            font-size: 30px;
            color: #1c1b1b;
          }

          h4 {
            font-weigth: bold;
            font-size: 15px;
            color: #595959;
          }

          .bg-image {
            background-image: url('http://localhost:3001/img/certificate/BG-NotSealMaster.png');
            background-color: #cccccc;
            height: 575px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
          }

          .information {
            text-align: center;
            position: absolute;
            top: 10%;
            left: 25%;
            font-wigth: bold;
            transform: translate(-10%, -10%);
            align-items: center;
          }

          .dateList {
            position: absolute;
            top: 2%;
            left: 75%;
            font-wigth: bold;
            color: #1c1b1b;
          }
        </style>
      </head>
      <body>
        <div class="bg-image">
          <div class="information">
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <u>Certificado</u>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
            <h4>Certificamos que</h4>
            <h2>${studentName}</h2>
            <h4>concluiu o seu curso de ${thisCourse.name},</h4>
            <h4>recebendo a titulação de
            <h2>${titration}</h2>
            <h4>tendo alcançado excelente nivel de aproveitamento.</h4>
          </div>

          <div class="dateList">
            <h5>Garibaldi, ${date}</h5>
          </div>
        </div>
      </body>
    </html>
  `;
};