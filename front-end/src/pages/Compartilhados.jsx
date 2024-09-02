import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListaFilmes from "../componentes/ListaFilmes";
import TituloSecao from "../componentes/TituloSecao";
import { obterFavoritosCompartilhados } from "../services/favoritos";
import Background from "../componentes/Background";

function Compartilhados() {
  const { token } = useParams(); 
  const [filmesFavoritos, setFilmesFavoritos] = useState([]);
  const [username, setUsername] = useState(''); 

  useEffect(() => {
    carregarFavoritosCompartilhados();
  }, [token]);

  async function carregarFavoritosCompartilhados() {
    const response = await obterFavoritosCompartilhados(token); 
    setFilmesFavoritos(response.favorite_movies);
    // Garante que o username seja tratado como uma string simples
    const cleanedUsername = response.username ? response.username.toString().trim() : '';
    setUsername(cleanedUsername);
  };

  return (
    <Background>
      <TituloSecao>{`Lista de favoritos de ${username}`}</TituloSecao>
      <ListaFilmes listaFilmes={filmesFavoritos} />
    </Background>
  );
};

export default Compartilhados;
