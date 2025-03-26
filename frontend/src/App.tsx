import React, { useState, useCallback, JSX } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Main from './components/main/main';
import VerMais from './components/verMais/verMais';
import Professores from './components/Professores/Professores';
import Editar from './components/Editar/Editar';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Lista from './components/Lista/Lista';
import './App.css';

interface Movie {
  _id: string;
  title: string;
  stars: number[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  categoria: string;
  description: string;
  poster: string;
  professor: string;
}

const App: React.FC = () => {
  const [filteredCards, setFilteredCards] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback((filteredCards: Movie[], searching: boolean) => {
    setFilteredCards(filteredCards);
    setIsSearching(searching);
  }, []);

  // Verifica se o usuário está autenticado e o token ainda é válido
  const isAuthenticated = () => {
    const authData = JSON.parse(localStorage.getItem('authData') || '{}');
    if (authData.expiry && new Date().getTime() > authData.expiry) {
      localStorage.removeItem('authData'); // Remove o token expirado
      return false;
    }
    return !!authData.token;
  };

  // Componente para proteger rotas privadas
  const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    const location = useLocation();
    return isAuthenticated() ? (
      element
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  };

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <Routes>
        {/* Página inicial pública */}
        <Route
          path="/"
          element={<Main isSearching={isSearching} searchResults={filteredCards} />}
        />
        {/* Página pública para ver mais detalhes */}
        <Route path="/vermais/:id" element={<VerMais />} />
        {/* Página de login */}
        <Route path="/login" element={<Login />} />
        {/* Rotas privadas */}
        <Route
          path="/professores"
          element={<PrivateRoute element={<Professores />} />}
        />
        <Route path="/editar" element={<PrivateRoute element={<Editar />} />} />
        <Route path="/lista" element={<PrivateRoute element={<Lista />} />} />
      </Routes>
    </Router>
  );
};

export default App;
