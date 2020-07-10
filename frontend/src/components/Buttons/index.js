import React from 'react';


import { Container, NewButtons } from './styles';

function Buttons({ name, click }) {

  return(
    <Container>
      <NewButtons onClick={click} >
        {name}
      </NewButtons>
    </Container>
  );
}

export default Buttons;