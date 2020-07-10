import styled from 'styled-components';

export const Container = styled.div`
  width: 60%;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  form {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 10px;
    width: 500%;
  }

  input {
    height: 50px;
    width: ${props => `${props.size}px`};
  }

  button {
    width: 150px;
    height: 50px;
    margin-bottom: 10px;
    background-color: #4c79d3;
    color: #fff;
    font-weight: bold;
    border: 0;
    font-size: 18px;
    text-align: center;
    border-radius: 8px;
    margin-left: 20px;
  }

  button:hover {
    background-color: #fff;
    color: #4c79d3;
  }
`;
