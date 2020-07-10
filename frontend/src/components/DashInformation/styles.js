import styled from 'styled-components';

export const Container = styled.div`
  height: 400px;
  width: 100%;
  max-width: 1380px;
  display: grid;
  grid-template-columns: auto auto;
  padding: 10px;
  margin-top: 200px;
`;

export const GridItem = styled.div`
  width: 650px;
  background: #3A5BA2;
  color: #fff;
  font-weight: bold;
  padding: 20px;
  margin: 10px;
  font-size: 18px;
  text-align: center;
  border-radius: 8px;

  &:hover {
    background: #4c79d3;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 1.19);
  }

  h1 {
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 25px;
  }

  p {
    margin-bottom: 25px;
    font-size: 18px;
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

export const ButtonContainer = styled.button`
  height: 60px;
  width: 200px;
  background: #3A5BA2;
  border: 0;
  border-radius: 8px;
  color: #FFF;
  font-weight: bold;
  margin-top: 40px;
  margin-left: 10px;
  margin-right: 10px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  line-height: 60px;
  transition: filter 0.2s;

  &:hover {
    background: #4c79d3;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 1.19);
  }
`;
