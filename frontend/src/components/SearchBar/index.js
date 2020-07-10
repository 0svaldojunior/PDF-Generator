import React from 'react';

import { Container } from './styles';

function SearchBar({ content, setContent}) {
  
  return(
    <Container>
      <input 
        value={content}
        onChange={event => setContent(event.target.value)}
        placeholder={`Informe o filtro de busca`}
      /> 
    </Container>
  );
}

export default SearchBar;