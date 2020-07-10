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

export const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1380px;
  display: grid;
  grid-template-columns: auto auto;
  padding: 10px;
`;

export const GridItem = styled.div`
  height: 250px;
  width: 650px;
  background: #3A5BA2;
  color: #fff;
  font-weight: bold;
  padding: 20px;
  margin: 10px;
  font-size: 18px;
  text-align: left;
  border-radius: 8px;
  display: flex;
  flex-direction: row;

  &:hover {
    background: #4c79d3;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 1.19);
  }

  h1 {
    margin: 20px 20px;
    font-size: 22px;
    font-weight: normal;
  }

  button {
    border: 0;
    border-radius: 8px;
    color: #fff;
    background: rgba(0, 0, 0, 0);
    width: 200px;
    height: 60px;
    text-align: center;
    align-items: center;
    font-weight: bold;
    margin-left: 20px;
  }

  button:hover {
    color: #4c79d3;
    background: #fff;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  height: 120px;
`;

export const Column2 = styled(Column)`
  margin-top: 70px;
`;