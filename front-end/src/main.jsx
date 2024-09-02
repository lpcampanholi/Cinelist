import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EstilosGlobais from './componentes/EstilosGlobais/index.jsx';
import Layout from './componentes/Layout';
import Favoritos from './pages/Favoritos.jsx';
import Home from './pages/Home.jsx';
import Pesquisa from './pages/Pesquisa.jsx';
import LoginPage from './pages/Login.jsx';
import SignupPage from './pages/Signup.jsx';
import Compartilhados from './pages/Compartilhados';
import { AuthProvider } from './contextos/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider >
      <EstilosGlobais />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/pesquisa" element={<Layout><Pesquisa /></Layout>} />
          <Route path="/favoritos" element={<Layout><Favoritos /></Layout>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/compartilhados/:token" element={<Layout><Compartilhados  /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
