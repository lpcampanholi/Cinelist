import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.8em;
  border: 1px solid var(--destaque);
  border-radius: 4px;
  font-size: 1em;
  background: transparent;
  color: var(--branco);
  &::placeholder {
      color: var(--branco);
    }
`;

const CampoTexto = ({ type = 'text', placeholder, value, onChange, required, autoFocus = false }) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      autoFocus={autoFocus}
    />
  );
};

export default CampoTexto;
