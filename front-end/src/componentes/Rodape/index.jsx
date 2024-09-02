import styled from "styled-components";

const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  background-color: var(--cinza-escuro);
  color: var(--branco);
  a {
    margin-left: 5px;
    padding-top: 4px;
    color: var(--branco);
  }
  a:hover {
    color: var(--destaque);
    transition: all 0.2s;
  }
`;

function Rodape() {
  return (
    <Container>
      <a href="https://github.com/kcezario/CineList" target="_blank">Repositório do Projeto</a>
    </Container>
  );
};

export default Rodape;
