import { useEffect, useState } from "react";
import ListaFilmes from "../componentes/ListaFilmes";
import { obterFavoritos, gerarLinkFavoritos } from "../services/favoritos";
import styled from "styled-components";
import TituloSecao from "../componentes/TituloSecao";
import Background from "../componentes/Background";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
`;

const Compartilhar = styled.button`
  color: var(--branco);
  background: transparent;
  border: 1px solid var(--destaque);
  padding: 0.5em 1em;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    border-color: var(--destaque-claro);
  }
`;

const Link = styled.p`
  background-color: var(--cinza-escuro);
  margin: 0;
  padding: 0.5em;
  border-radius: 5px;
  a {
    color: var(--branco);
  }
  a:hover {
    color: var(--destaque);
  }
`;

function Favoritos() {

  const [filmesFavoritos, setFilmesFavoritos] = useState([]);
  const [linkFavorito, setLinkFavorito] = useState("");
  
  useEffect(() => {
    fetchFavoritos();
  }, []);

  async function fetchFavoritos() {
    const favoritos = await obterFavoritos();
    setFilmesFavoritos(favoritos);
  };

  async function gerarLink() {
    const token = await gerarLinkFavoritos();
    const link = `${import.meta.env.VITE_FRONTEND_URL}/compartilhados/${token}`;
    setLinkFavorito(link);
    alert(`Link gerado com sucesso: ${link}`);
  };

  return (
    <Background>
      <Container>
        <TituloSecao>Meus favoritos</TituloSecao>
        <Compartilhar onClick={gerarLink}>Compartilhar</Compartilhar>
        {linkFavorito && <Link><a href={linkFavorito} target="_blank">{linkFavorito}</a></Link>}
      </Container>
      <ListaFilmes listaFilmes={filmesFavoritos} atualizarListaFilmes={fetchFavoritos} />
    </Background>
  );
};

export default Favoritos;
