import React, { useState, useEffect } from 'react'; // Adicionado useEffect
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Verifica se o login já expirou
    const authData = JSON.parse(localStorage.getItem('authData') || '{}');
    if (authData.expiry && new Date().getTime() > authData.expiry) {
      localStorage.removeItem('authData'); // Remove dados expirados
      console.log('Login expirado');
    }
  }, []); // Executado apenas uma vez ao carregar o componente

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Faz a requisição para a API de login
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Adicionado: Calcula o tempo de expiração de 20 minutos
        const expiryTime = new Date().getTime() + 20 * 60 * 1000; // 20 minutos em milissegundos
        const authData = { token: result.token, expiry: expiryTime };
        localStorage.setItem('authData', JSON.stringify(authData)); // Salva token e expiração

        // Exibe mensagem de sucesso
        setResponseMessage('Login realizado com sucesso!');
        setShowPopup(true);

        // Redireciona para a página original ou para "/professores" (padrão)
        const origin = location.state?.from?.pathname || '/professores';
        setTimeout(() => {
          setShowPopup(false);
          navigate(origin, { replace: true }); // Redireciona imediatamente
        }, 1000);
      } else {
        // Exibe mensagem de erro
        setResponseMessage(result.msg || 'Senha ou email errado');
        setShowPopup(true);

        // Remove o popup após 3 segundos
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      }
    } catch (error) {
      // Caso a API não esteja acessível
      console.error('Erro:', error);
      setResponseMessage('Erro ao conectar-se com a API');
      setShowPopup(true);

      // Remove o popup após 3 segundos
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Senha:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>

      {showPopup && <div className="popup">{responseMessage}</div>}
    </div>
  );
};

export default Login;
