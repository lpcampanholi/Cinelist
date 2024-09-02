import Background from "../componentes/Background";
import TituloSecao from "../componentes/TituloSecao";
import { useEffect, useState } from "react";
import { getFilmesMaisVotados, getFilmesPopulares, getFilmesRecentes } from "../services/filmes";
import CarrosselFilmes from "../componentes/CarrosselFilmes";

function Home() {

  const [filmesMaisVotados, setFilmesMaisVotados] = useState([]);
  const [filmesPopulares, setFilmesPopulares] = useState([]);
  const [filmesRecentes, setFilmesRecentes] = useState([]);

  useEffect(() => {
    fetchFilmesMaisVotados();
    fetchFilmesPopulares();
    fetchFilmesRecentes();
  }, []);

  async function fetchFilmesMaisVotados() {
    const filmesMaisVotadosDaApi = await getFilmesMaisVotados();
    setFilmesMaisVotados(filmesMaisVotadosDaApi);
  };

  async function fetchFilmesPopulares() {
    const filmesPopularesDaApi = await getFilmesPopulares();
    setFilmesPopulares(filmesPopularesDaApi);
  };

  async function fetchFilmesRecentes() {
    const filmesRecentesDaApi = await getFilmesRecentes();
    setFilmesRecentes(filmesRecentesDaApi);
  };

  return (
    <Background>
      <TituloSecao>Mais votados</TituloSecao>
      <CarrosselFilmes listaFilmes={filmesMaisVotados} atualizarListaFilmes={fetchFilmesMaisVotados} />
      <TituloSecao>Populares</TituloSecao>
      <CarrosselFilmes listaFilmes={filmesPopulares} atualizarListaFilmes={fetchFilmesPopulares} />
      <TituloSecao>Recentes</TituloSecao>
      <CarrosselFilmes listaFilmes={filmesRecentes} atualizarListaFilmes={fetchFilmesRecentes} />
    </Background>
  );
};

export default Home;
