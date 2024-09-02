import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { getFilmesPesquisados } from "../../services/filmes";
import { useNavigate } from "react-router-dom";

const Container = styled.form`
  display: inline-block;
  position: relative;
`;

const Campo = styled.input`
    width: 30em;
    height: 3em;
    padding: 0.2em 0.8em;
    font-weight: 400;
    color: var(--branco);
    background: transparent;
    border: 1px solid;
    border-color: var(--destaque);
    border-radius: 0.5em;
    box-sizing: border-box;

    &::placeholder {
      color: var(--branco);
    }
`;

const IconeLupa = styled.img`
  position: absolute;
  top: 12px;
  right: 10px;
`;

function InputPesquisa() {

  const [textoDaBusca, setTextoDaBusca] = useState("");
  const navigate = useNavigate();

  async function submeterPesquisa(e) {
    e.preventDefault();
    const filmesPesquisadosDaApi = await getFilmesPesquisados(textoDaBusca);
    navigate('/pesquisa', { state: { filmesPesquisados: filmesPesquisadosDaApi, textoPesquisa: textoDaBusca } });
    setTextoDaBusca("");
  };

  return (
    <Container onSubmit={submeterPesquisa}>
      <Campo
        type="text"
        name="pesquisa"
        id="pesquisa"
        placeholder="O que você procura?"
        value={textoDaBusca}
        onChange={(e) => setTextoDaBusca(e.target.value)}
      />
      <NavLink to="/pesquisa"><IconeLupa src="/imagens/lupa.png" alt="ícone de lupa" /></NavLink>
    </Container>
  )
};

export default InputPesquisa;
