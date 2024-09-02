import React, { useState } from 'react';
import styled from 'styled-components';
import CampoTexto from '../CampoTexto';
import Botao from '../Botao';
import { NavLink, useNavigate } from 'react-router-dom';
import TituloPrincipal from '../TituloPrincipal';
import Formulario from '../Formulario';
import { useAuth } from '../../contextos/AuthProvider';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    color: var(--branco);
  }

  a {
    color: var(--branco);
  }
  a:hover {
    color: var(--destaque);
    transition: all 0.2s;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
`;

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      navigate('/');
    } catch (error) {
      setError('Credenciais inválidas. Por favor, tente novamente.');
    };
  };

  return (
    <Container>
      <TituloPrincipal>Login</TituloPrincipal>
      <Formulario onSubmit={submit}>
        <CampoTexto
          type="text"
          placeholder="Nome de Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
        <CampoTexto
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Botao>Entrar</Botao>
      </Formulario>
      <span>Não possui conta? <NavLink to="/signup">Registre-se</NavLink></span>
    </Container>
  );
};

export default Login;
