import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 120px;
  width: 650px;
  margin-left: 80px;

  @media (max-width: 1300px) {
    margin-left: 20px;
  }
`;
