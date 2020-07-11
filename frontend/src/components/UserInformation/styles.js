import styled from 'styled-components';

export const GlobalContainer = styled.div`
  height: 100%;
`;

export const ScrollContainer = styled.div`
  overflow: scroll;
  height: 290px;
  width: 100%;
  max-width: 100%;
  margin-top: 5px;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 10px;
`;

export const GridItem = styled.div`
  width: 650px;
  height: 410px;
  background: #3A5BA2;
  color: #fff;
  font-weight: bold;
  padding: 10px;
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

export const GridItem2 = styled(GridItem)`
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
    margin-left: 70px;
  }

  button:hover {
    color: #4c79d3;
    background: #fff;
  }
`;

export const ListGridItem = styled(GridItem)`
  height: 260px;
  width: 415px;
  text-align: left;
`;

export const ListGridContainer = styled(Container)`
  grid-template-columns: auto auto auto;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 120px;
`;

export const Right = styled.div`
  margin-left: 95%;
`;

export const SearchPadding = styled.div`
  margin-left: 50px;
  align-items: center;
  align-content: center;
`;
