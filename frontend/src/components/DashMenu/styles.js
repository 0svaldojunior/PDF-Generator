import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  flex-direction: column;
  width: 300px;
  background: #fff;
  padding: 40px;
  flex-direction: column;
  align-items: flex-start;
`;

export const ButtonContainer = styled.button`
  height: 60px;
  width: 200px;
  background: #FFF;
  border: 0;
  border-radius: 8px;
  color: #3A5BA2;
  font-weight: bold;
  margin-top: 40px;
  margin-left: 10px;
  margin-right: 10px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  font-size: 22px;
  line-height: 60px;
  transition: filter 0.2s;

  &:hover {
    background: #4c79d3;
    color:#FFF;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 1.19);
  }
`;

export const ButtonGetOutContainer = styled.button`
  height: 60px;
  width: 200px;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  border-radius: 8px;
  color: #f74545;
  font-weight: bold;
  margin-top: 40px;
  margin-left: 10px;
  margin-right: 10px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  font-size: 15px;
  line-height: 60px;
  transition: filter 0.2s;

  &:hover {
    color: #fff;
    background: #f74545;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 1.19);
  }
`;

export const Image = styled.img`
  height: 220px;
`;

