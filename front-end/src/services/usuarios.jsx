import axios from "axios";

const api = axios.create({ 
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/users/`,
  withCredentials: true
});

async function registrarUsuario(username, email, password) {
  const res = await api.post("register/", {
    username,
    email,
    password
  });
  return res.data;
};

async function loginUsuario(username, password) {
  const res = await api.post("login/", {
    username,
    password
  });
  const { token, username: userName } = res.data;
  localStorage.setItem('token', token);
  localStorage.setItem('username', JSON.stringify(userName));
  return res.data;
};

async function checkAuth() {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('check-auth/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    if (response.data.isAuthenticated) {
      const { username } = response.data;
      return { isAuthenticated: true, username: username };
    } else {
      return { isAuthenticated: false };
    };
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return { isAuthenticated: false };
  };
};

async function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  try {
    await api.post('logout/', {}, {
    });
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};

export {
  registrarUsuario,
  loginUsuario,
  checkAuth,
  logoutUser,
};
