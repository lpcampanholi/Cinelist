import styled from "styled-components";
import CardFilme from "../CardFilme";
import { useState } from "react";
import ModalFilme from "../ModalFilme";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  .slick-prev:before,
  .slick-next:before {
    color: var(--branco);
  }
`;

function CarrosselFilmes({ listaFilmes, atualizarListaFilmes }) { 
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 250,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <Slider {...settings}>
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
      </Slider>
      {modalAberto && ( 
        <ModalFilme filme={filmeSelecionado} aoFechar={fecharModal} aoFavoritar={aoFavoritar} /> 
      )} 
    </Container>
  );
};

export default CarrosselFilmes;
