import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/movies/fav`,
  withCredentials: true
});

async function obterFavoritos() {
  const token = localStorage.getItem('token');
  const res = await api.get('/list', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res.data;
};

async function adicionarAosFavoritos(filmeId) {
  const token = localStorage.getItem('token');
  const res = await api.post(`/add/${filmeId}/`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res.data;
};

async function removerDosFavoritos(filmeId) {
  const token = localStorage.getItem('token');
  const res = await api.delete(`/remove/${filmeId}/`, {
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  });
  return res.data;
};

async function gerarLinkFavoritos() {
  const res = await api.get('/generate-link');
  const { token } = res.data;
  return token;
};

async function obterFavoritosCompartilhados(token) {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/movies/shared/${token}/`);
  return res.data;
};

export { 
  obterFavoritos,
  adicionarAosFavoritos,
  removerDosFavoritos,
  gerarLinkFavoritos,
  obterFavoritosCompartilhados
};
