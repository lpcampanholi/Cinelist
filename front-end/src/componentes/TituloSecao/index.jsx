import styled from "styled-components";

const Titulo = styled.h2`
  color: var(--destaque);
  text-align: left;
  font-size: 1.2em;
  margin: 0;
  padding: 1em;
`;

function TituloSecao({ children }) {

  const tituloTexto = typeof children === 'string' ? children.toUpperCase() : String(children).toUpperCase();

  return (
    <Titulo>{tituloTexto}</Titulo>
  );
}

export default TituloSecao;