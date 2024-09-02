import { createContext, useState, useContext, useEffect } from 'react';
import { checkAuth, loginUsuario, logoutUser } from '../../services/usuarios';

// Cria o contexto de autenticação
const AuthContext = createContext();

// Hook personalizado para usar o contexto de autenticação
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    verificarAutenticacao();
  }, []);

  async function verificarAutenticacao() {
    const authStatus = await checkAuth();
    setIsLogged(authStatus.isAuthenticated);
    if (authStatus.isAuthenticated) {
      setUserName(authStatus.username);
    } else {
      setUserName("");
    }
  }

  async function login(username, password) {
    await loginUsuario(username, password);
    await verificarAutenticacao()
  }

  async function logout() {
    const confirmLogout = confirm("Tem certeza que quer fazer Logout?");
    if (confirmLogout) {
      await logoutUser();
      setIsLogged(false);
    }
  }

  return (
    <AuthContext.Provider value={{ isLogged, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
