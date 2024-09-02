import ListaFilmes from "../componentes/ListaFilmes";
import Background from "../componentes/Background";
import TituloSecao from "../componentes/TituloSecao";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getFilmesPesquisados } from "../services/filmes";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  gap: 2em;
  align-items: center;

  span {
    color: var(--branco);
  }
`;

function Pesquisa() {

  const location = useLocation();
  const { filmesPesquisados, textoPesquisa } = location.state || { filmesPesquisados: [], textoPesquisa: "" };
  const [filmes, setFilmes] = useState(filmesPesquisados);

  useEffect(() => {
    setFilmes(filmesPesquisados);
  }, [filmesPesquisados]);

  const atualizarListaFilmes = async () => {
    if (textoPesquisa) {
      const filmesAtualizados = await getFilmesPesquisados(textoPesquisa);
      setFilmes(filmesAtualizados);
    };
  };

  return (
    <Background>
      <Container>
        <TituloSecao>Pesquisa</TituloSecao>
        {textoPesquisa &&<span>Pesquisado por: "<strong>{textoPesquisa}</strong>"</span>}
      </Container>
      <ListaFilmes listaFilmes={filmes} atualizarListaFilmes={atualizarListaFilmes} />
    </Background>
  );
};

export default Pesquisa;
