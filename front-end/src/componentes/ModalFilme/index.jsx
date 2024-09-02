import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { adicionarAosFavoritos, removerDosFavoritos } from "../../services/favoritos";
import { useAuth } from "../../contextos/AuthProvider";
import { useEffect, useState } from "react";

const Fundo = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

const Model = styled.div`
  background-color: black;
  max-width: 70%;
  height: 70%;
  color: var(--branco);
  position: relative;
  z-index: 1001;
`;

const ContainerFlex = styled.div`
  display: flex;
  height: 100%;
`;

const ImgCapa = styled.img`
  width: auto;
  max-width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImagemFundo = styled.div`
  position: relative;
  background-image: ${props => `url(${props.$imagemFundo})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1;
  }
`;

const Conteudo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4em 2em;
`;

const Generos = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  position: relative;
  z-index: 2;
`;

const TagGenero = styled.div`
  background-color: var(--branco-transparente);
  padding: 0.5em 1em;
  border-radius: 0.5em;
`;

const Fechar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5em;
  height: 2.5em;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 20px;
  color: var(--branco);
  transition: background-color 0.3s;
  z-index: 3;
  &:hover {
    background-color: var(--branco-transparente);
  }
`;

const Overview = styled.p`
  z-index: 2;
  text-align: left;
  margin: 1em 0;
`;

const Rodape = styled.div`
  z-index: 2;
  display: flex;
  gap: 1em;
`;

const Favorito = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5em;
  height: 2.5em;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  color: var(--branco);
  transition: background-color 0.3s;
  z-index: 3;
  &:hover {
    background-color: var(--branco-transparente);
  }
`;

const Lancamento = styled.div`
  background-color: var(--branco-transparente);
  padding: 1em;
  border-radius: 0.5em;
  display: flex;
  align-items: center;
`;

const Nota = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 0.5em;
  width: 5em;
  font-weight: 900;
  color: var(--branco);
  background-color: var(--branco-transparente);
  svg {
    color: var(--amarelo);
  }
`;

function ModalFilme({ filme, aoFechar, aoFavoritar }) {
  const { isLogged } = useAuth();
  const [isFavorito, setIsFavorito] = useState(filme.is_favorite);

  async function alternarFavorito(id) {
    if (!isLogged) {
      alert("Você precisa estar logado para favoritar filmes.");
      return;
    };
    try {
      if (isFavorito) {
        await removerDosFavoritos(id);
        setIsFavorito(false);
      } else {
        await adicionarAosFavoritos(id);
        setIsFavorito(true);
      }
      if (aoFavoritar) {
        await aoFavoritar();
      }
    } catch (error) {
      console.error("Erro ao alternar favorito:", error);
      alert("Ocorreu um erro ao tentar atualizar seus favoritos. Por favor, tente novamente.");
    };
  };

  useEffect(() => {
    setIsFavorito(filme.is_favorite);
  }, [filme.is_favorite]);

  const capa = `https://image.tmdb.org/t/p/w500/${filme.poster_path}`;
  const capaFundo = `https://image.tmdb.org/t/p/w1280/${filme.backdrop_path}`;
  const anoLancamento = new Date(filme.release_date).getFullYear();

  return (
    <Fundo onClick={aoFechar}>
      <Model onClick={(e) => e.stopPropagation()}>
        <ContainerFlex>
          <ImgCapa src={capa} alt="capa do filme" />
          <ImagemFundo $imagemFundo={capaFundo}  >
            <Conteudo>
              <Fechar onClick={aoFechar}><IoClose /></Fechar>
              <Generos className="genres">
                {filme.genres.map((genre, index) => (
                  <TagGenero key={index}>{genre}</TagGenero>
                ))}
              </Generos>
              <Overview>{filme.overview}</Overview>
              <Rodape>
                <Lancamento>{anoLancamento}</Lancamento>
                <Nota><FaStar />{filme.vote_average.toFixed(1)}</Nota>
                <Favorito onClick={() => alternarFavorito(filme.tmdb_id)}>
                  {isFavorito ? <FaHeart /> : <FaRegHeart />}
                </Favorito>
              </Rodape>
            </Conteudo>
          </ImagemFundo>
        </ContainerFlex>
      </Model>
    </Fundo>
  );
}

export default ModalFilme;
