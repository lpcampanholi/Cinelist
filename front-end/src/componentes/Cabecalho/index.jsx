import styled from "styled-components";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";
import InputPesquisa from "../InputPesquisa";
import UserIcon from "../UserIcon";
import { useAuth } from "../../contextos/AuthProvider";

const Container = styled.header`
  background-color: var(--cinza-escuro);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
`;

const Navegacao = styled.nav`
  display: flex;
  gap: 1em;
  
  a {
    text-decoration: none;
    color: var(--branco);
  }

  a.active {
    border-bottom-color: var(--destaque);
  }

  a:hover {
    color: var(--destaque);
    text-decoration: underline;
  }
`;

const ContainerUsuario = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
`;

const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: var(--branco);
  cursor: pointer;
  font-size: 1em;

  &:hover {
    text-decoration: underline;
    color: var(--destaque);
  }
`;

function Cabecalho() {

  const { isLogged, logout } = useAuth();
  
  return (
    <Container>
      <NavLink to="/"><Logo /></NavLink>
      <InputPesquisa />
      { isLogged ?
      <ContainerUsuario>
        <Navegacao>
          <NavLink to="/favoritos">Favoritos</NavLink>
        </Navegacao>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
        <UserIcon />
      </ContainerUsuario>
      :
      <Navegacao>
        <NavLink to="/login">Login</NavLink>
      </Navegacao> }
    </Container>
  );
};

export default Cabecalho;
