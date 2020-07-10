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

          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          
          td, th {
            border: 0;
            text-align: left;
            padding: 8px;
          }

          .bg-image {
            background-image: url('http://localhost:3001/img/certificate/BG-SealMaster.png');
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

          .bg-student {
            background-image: url('http://localhost:3001/img/certificate/BG-Student.png');
            background-color: #cccccc;
            height: 575px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
          }

          .studentInformation {
            text-align: center;
            position: absolute;
            top: 10%;
            left: 20%;
            font-wigth: bold;
            transform: translate(-10%, -10%);
          }

          .historic {
            width: 100%;
            heigth: 575px;
            text-align: center;
            align-items: center;
            position: absolute;
          }
          
          .historic h1 { 
            font-size: 30px; 
          }

          .historic th { font-size: 10px; }

          .studentInformation2 {
            left: 5%;
          }

          .table-historic {
            background-image: url('http://localhost:3001/img/certificate/BG-Historic.png');
            background-color: #cccccc;
            height: 305px;
            width: 820px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
            border: 1px solid #dddddd;
            text-align: left;
            rigth: 2%;
            columns: 100px 3;
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

        <div class="bg-student">
          <div class="studentInformation">
            <h1>${thisCourse.name}</h1>
            <table>
              <tr>
                <th>NOME: ${studentName}</th>
                <th>CPF: ${studentCPF}</th>
              </tr>
              <tr>
                <th>CURSO: ${thisCourse.name}</th>
                <th>FREQUÊNCIA: 100%</th>
              </tr>
              <tr>
                <th>TOTAL DE HORAS AULA: ${thisCourse.workload}</th>
                <th>NOTA: ${note}</th>
              </tr>
            </table>
            <h5>REGISTRO: ${registerNumber}</h5>
          </div>
        </div>

        <div class="historic">
          <h1><br>${thisCourse.name}</h1>
          <div class="studentInformation2">
            <table>
              <tr>
                <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NOME: ${studentName}</th>
                <th>CPF: ${studentCPF}</th>
              </tr>
              <tr>
                <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CURSO: ${thisCourse.name}</th>
                <th>FREQUÊNCIA: 100%</th>
              </tr>
              <tr>
                <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TOTAL DE HORAS AULA: ${thisCourse.workload}</th>
                <th>NOTA: ${note}</th>
              </tr>
              <tr>
                <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REGISTRO: ${thisCourse.register_number}</th>
              </tr>
            </table>
          </div>
        <h5>HISTÓRICO DO CURSO</h5>
        <H5>Foi Desenvolvido no Curso Livre de "${thisCourse.name}", o seguinte  conteúdo programático:</H5>
        <div class="table-historic">
          ${thisCourse.content}
        </div>
        </div>
      </body>
    </html>
  `;
};