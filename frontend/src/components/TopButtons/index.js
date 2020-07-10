import React from 'react';
import { useHistory } from 'react-router-dom';


import { Container } from './styles';
import Buttons from '../Buttons';


function TopButtons() {
  const history = useHistory();

  return(
    <Container>
      <Buttons name="Emitir" click={() => {
        try {
          return ( history.push('/certificates') );
        } catch (error) {
          alert('Falha ao trocar de página, verifique e tente novamente!');
        }
      }} />

      <Buttons name="Digital" click={() => {
        try {
          return ( history.push('/certificates-digital') );
        } catch (error) {
          alert('Falha ao trocar de página, verifique e tente novamente!');
        }
      }} />

      <Buttons name="Impressos" click={() => {
        try {
          return ( history.push('/certificates-print') );
        } catch (error) {
          alert('Falha ao trocar de página, verifique e tente novamente!');
        }
      }} />

      {/* <Buttons name="Emitidos" click={() => {
        try {
          return ( history.push('/certificates-issued') );
        } catch (error) {
          alert('Falha ao trocar de página, verifique e tente novamente!');
        }
      }} /> */}
    </Container>
  );
}

export default TopButtons;