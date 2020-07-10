import React from 'react';
import { useHistory } from 'react-router-dom';


import { Container } from './styles';
import Buttons from '../Buttons';


function TopButtons() {
  const history = useHistory();

  return(
    <Container>
      <Buttons name="Cadastrar" click={() => {
        try {
          return ( history.push('/courses') );
        } catch (error) {
          alert('Falha ao trocar de página, verifique e tente novamente!');
        }
      }} />

      <Buttons name="Listar" click={() => {
        try {
          return ( history.push('/courses-list') );
        } catch (error) {
          alert('Falha ao trocar de página, verifique e tente novamente!');
        }
      }} />
    </Container>
  );
}

export default TopButtons;