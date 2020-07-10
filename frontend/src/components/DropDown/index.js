import React, { useState } from 'react';

import { Container } from './styles';

function DropDown(props) {
  const [choice, setChoice] = useState('');

  function handleSearch() {
    
  };
  return(
    <Container size={props.size}>
      <form onSubmit={handleSearch}>
        <input
          placeholder="Selecione um curso"
          value={choice}
          onChange = { event => setChoice(event.target.value) }
          type="search"
          list="list"
        />

        <datalist id="list">
          <option value="Curso1" />
          <option value="Curso2" />
          <option value="Curso3" />
        </datalist>

        <button type="submit">Selecionar</button>
      </form>
    </Container>
  );
};

export default DropDown;