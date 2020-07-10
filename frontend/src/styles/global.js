import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    background: #dee9ed;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  html, body, #root {
    height: 100%;
  }

  input, button, textarea {
    font: 400 18px Roboto, sans-serif;
}

button {
    cursor: pointer;
}

form input {
  width: 100%;
  height: 60px;
  color: rgb(51, 51, 51);
  border: 1px solid #dcdce6;
  border-radius: 8px;
  padding: 0 24px;
}

form textarea {
  width: 100%;
  resize: vertical;
  min-height: 140px;
  color: rgb(51, 51, 51);
  border: 1px solid #dcdce6;
  border-radius: 8px;
  padding: 16px 24px;
  line-height: 24px;
}

.button {
  width: 100%;
  height: 60px;
  background: #3A5BA2;
  border: 0;
  border-radius: 8px;
  color: #FFF;
  font-weight: bold;
  margin-top: 16px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  line-height: 60px;
  transition: filter 0.2s;
}

.button:hover {
  filter: brightness(80%);
}
`;
