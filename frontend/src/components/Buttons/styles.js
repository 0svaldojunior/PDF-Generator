import styled from 'styled-components';

export const Container = styled.div`
  height: 400px;
  width: 100%;
  max-width: 1380px;
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

export const NewButtons = styled.button`
  width: 200px;
  height: 60px;
  background: rgba(0, 0, 0, 0);
  color: #3A5BA2;
  font-weight: bold;
  border: 0;
  padding: 20px;
  margin: 10px;
  font-size: 18px;
  text-align: center;
  border-radius: 8px;
  margin-left: 10px;

  &:hover {
    background: #4c79d3;
    color: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 1.19);
  }
`;