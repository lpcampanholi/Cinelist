import styled from 'styled-components';

const Button = styled.button`
  padding: 0.8em;
  background-color: var(--destaque);
  border: none;
  border-radius: 4px;
  font-size: 1em;
  color: var(--cinza-escuro);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--destaque-claro);
  }
`;

const Botao = ({ children, onClick, type = 'submit' }) => {
  return (
    <Button type={type} onClick={onClick}>
      {children}
    </Button>
  );
};

export default Botao;
