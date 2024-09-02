import styled from "styled-components";
import CardFilme from "../CardFilme";
import { useState } from "react";
import ModalFilme from "../ModalFilme";

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

function ListaFilmes({ listaFilmes, atualizarListaFilmes }) { 
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = (filme) => {
    setFilmeSelecionado(filme);
    setModalAberto(true);
  };

  async function fecharModal() {
    setModalAberto(false);
    setFilmeSelecionado(null);
    if (atualizarListaFilmes) {
      await atualizarListaFilmes();
    };
  };

  async function aoFavoritar() {
    if (atualizarListaFilmes) {
      await atualizarListaFilmes();
    };
  };

  return (
   <Container>
      {listaFilmes.map(filme => {
        const capa = filme.poster_path
        ? `https://image.tmdb.org/t/p/w185/${filme.poster_path}`
        : null;
        return (
          <CardFilme
          key={filme.tmdb_id}
          titulo={filme.title}
          nota={filme.vote_average}
          capa={capa}
          favorito={filme.is_favorite}
          aoClicar={() => abrirModal(filme)}
        />
      )})}
      {modalAberto && ( 
        <ModalFilme filme={filmeSelecionado} aoFechar={fecharModal} aoFavoritar={aoFavoritar} /> 
      )} 
    </Container>
  );
};

export default ListaFilmes;
