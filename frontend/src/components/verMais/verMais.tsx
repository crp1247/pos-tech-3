import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './vermais.css';  // Certifique-se de que o CSS está sendo importado corretamente

interface Movie {
  _id: string;
  title: string;
  stars: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  categoria: string;
  description: string;
  poster: string;
  professor: string;
}

const VerMais: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o parâmetro `id` da URL
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/movie/${id}`); // URL da sua API para obter detalhes do filme
        if (!response.ok) {
          throw new Error('Erro ao buscar os detalhes do filme');
        }
        const data: Movie = await response.json();
        setMovie(data); // Atualiza o estado com os detalhes do filme
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  if (!movie) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="vermais-main-container">
      <div className="vermais-card">
        <img src={movie.poster} alt={movie.title} className="vermais-card-img" />
        <h2 className="vermais-card-title">{movie.title}</h2>
        <p className="vermais-card-description">{movie.description}</p>
        <h6 className="vermais-card-professor">Autor: {movie.professor}</h6>
      </div>
    </div>
  );
};

export default VerMais;
