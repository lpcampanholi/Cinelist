import React, { useState } from 'react';
import styled from 'styled-components';
import CampoTexto from '../CampoTexto';
import Botao from '../Botao';
import { useNavigate } from 'react-router-dom';
import { registrarUsuario } from '../../services/usuarios';
import Formulario from '../Formulario';
import TituloPrincipal from '../TituloPrincipal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
`;

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await registrarUsuario(username, email, password);
      alert("Usuário criado com sucesso!");
      navigate('/login');
    } catch (error) {
      setError('Erro ao criar conta. Por favor, tente novamente.');
    };
  };

  return (
    <Container>
      <TituloPrincipal>Criar Conta</TituloPrincipal>
      <Formulario onSubmit={handleSubmit}>
        <CampoTexto
          type="text"
          placeholder="Nome de Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <CampoTexto
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <CampoTexto
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Botao>Criar Conta</Botao>
      </Formulario>
    </Container>
  );
};

export default Signup;
