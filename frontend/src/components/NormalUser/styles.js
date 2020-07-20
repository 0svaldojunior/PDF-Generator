import styled from 'styled-components';

export const GlobalContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 120px;
`;

export const GridItem = styled.div`
  width: 100%;
  background: #3A5BA2;
  color: #fff;
  font-weight: bold;
  padding: 20px;
  margin: 10px;
  font-size: 18px;
  text-align: center;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;

  &:hover {
    background: #4c79d3;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 1.19);
  }

  h1 {
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 38px;
  }

  p {
    margin-top:34px;
    margin-bottom: 25px;
    margin-left: 50px;
    font-size: 23px;
  }

  button {
    color: #fff;
    background-color: rgba(0, 0, 0, 0);
    border: 0;
    width: 30px;
    height: 30px;
    border-radius: 50px;
  }

`;

export const ScrollContainer = styled.div`
  overflow: scroll;
  height: 750px;
  width: 100%;

  &:-webkit-scrollbar {
    display: none;
  }
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
    margin-left: 20px;
    text-align: left;
    padding-left: 20px;
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
  margin-left: 25px;
  margin-bottom: 20px;
  color: #3A5BA2;
  background: rgba(0, 0, 0, 0);
  padding: 20px;
  font-size: 40px;
  font-weight: bold;
  height: 250px;
  width: 100%;
  height: 90px;

  &:hover {
    color:#fff;
    background: #4c79d3;
  }
`;

export const LogOutButton = styled(Button2)`
  font-size: 23px;
  margin-top: 12px;
  width: 100px;
  height: 80px;

  &:hover {
    color:#4c79d3;
    background: #fff;
    width: 100px;
    height: 60px;
  }
`;
