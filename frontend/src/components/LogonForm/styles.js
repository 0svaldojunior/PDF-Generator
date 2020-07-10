import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;
`;

export const Form = styled.form`
  width: 450px;
  margin-right: 30px;
  margin-left: 30px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 32px;
  margin-left: 80px;
`;

export const Password = styled.div`
  margin-top: 10px;
`;

export const Button = styled.button`
  margin-top: 10px;
  width: 450px;
  height: 60px;
  background: #3A5BA2;
  color: #fff;
  font-weight: bold;
  border: 0;
  padding: 20px;
  font-size: 18px;
  text-align: center;
  border-radius: 8px;

  &:hover {
    background: #4c79d3;
    color: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 1.19);
  }

`;

export const Image = styled.img`
  margin-right: 20px;
  width: 450px;
  height: 450px;
  margin-left: 40px;
`;
