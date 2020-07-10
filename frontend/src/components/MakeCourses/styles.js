import styled from 'styled-components';

export const GlobalContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const ScrollContainer = styled.div`
  overflow: scroll;
  height: 800px;
  width: 100%;
`;

export const Container = styled.div`
  height: 100%;
  width: 95%;
  max-width: 1380px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-left: 25px;

  h1 {
    font-size: 32px;
    margin-left: 40px;
  }

  h2 {
    margin-top: 10px;
    margin-left: 20px;
    margin-bottom: 10px;
    font-size: 22px;
  }

  button {
    border: 0;
    border-radius: 8px;
    margin-left: 50px;
    margin-bottom: 20px;
    color: #3A5BA2;
    background: rgba(0, 0, 0, 0);
    padding: 20px;
    font-size: 40px;
    font-weight: bold;
    height: 100px;
    width: 97%;
  }

  button:hover {
    color:#fff;
    background: #4c79d3;
  }
`;


export const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 120px;
  margin-left: 20px;
`;

export const Row2 = styled(Row)`
  margin-top: 20px;

  input {
    border: 0;
    border-radius: 8px;
    height: 50px;
    width: ${props => `${props.input}px`};
    align-content: center;
  }

  h2 {
    width: ${props => `${props.h2}px`};
  }
`;

export const Course = styled(Container)`
  width: 100%;
  height: 100px;
  align-items: center;
  padding-top: 30px;
  border-radius: 8px;
  color: #3A5BA2;

  &:hover {
    color: #fff;
    background: #4c79d3;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 1.19);
  }

  h1 {
    margin-bottom: 15px;
  }
`;

export const Box = styled(Course)`
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: flex-start;
  padding-top: 5px;
`;

export const Button2 = styled.button`
  border: 0;
  border-radius: 8px;
  margin-left: 50px;
  margin-bottom: 20px;
  color: #3A5BA2;
  background: rgba(0, 0, 0, 0);
  padding: 20px;
  font-size: 40px;
  font-weight: bold;
  height: 250px;
  width: 97%;

  &:hover {
    color:#fff;
    background: #4c79d3;
  }
`;

export const BoxEditor = styled.div`
  height: 500px;
  width: 100%;
  border-radius: 8px;
  margin-left: 38px;
  margin-right: 55px;
  background: rgba(0, 0, 0, 0);
  padding: 5px;

  &:hover {
    background: #4c79d3;
  }

  h1 {
    color: #3A5BA2;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  &:hover h1{
    color: #fff;
  }
`;

export const BoxText = styled.div`
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const Forms = styled.form`
  
`;
