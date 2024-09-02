import axios from "axios";

const api = axios.create({ 
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/movies`,
  withCredentials: true
});

async function getFilmesMaisVotados() {
  const res = await api.get("/top/rated");
  return res.data;
};

async function getFilmesPopulares() {
  const res = await api.get("/top/popular");
  return res.data;
};

async function getFilmesRecentes() {
  const res = await api.get("/top/now_playing");
  return res.data;
};

async function getFilmesPesquisados(textoDaBusca) {
  const res = await api.get(`/search/?q=${textoDaBusca}`);
  return res.data;
};

export {
  getFilmesMaisVotados,
  getFilmesPopulares,
  getFilmesRecentes,
  getFilmesPesquisados
};
