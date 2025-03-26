import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Movie {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  categoria: string;
  description: string;
  poster: string;
  professor: string;
}

interface MainProps {
  isSearching: boolean;
  searchResults: Movie[];
}

// Styled Components
const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  gap: 30px;
  margin-top: 60px;

  @media (max-width: 750px) {
    margin-top: 200px; /* Adiciona margem maior para telas menores */
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 290px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: contain;
  background-color: #f0f0f0;
  padding-top: 10px;
`;

const CardTitle = styled.h2`
  font-size: 1.5em;
  margin: 10px 0;
`;

const CardDescription = styled.p`
  font-size: 1em;
  padding: 0 10px 10px;
  min-height: 60px;
`;

const ViewMoreButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  margin: 10px 25px;

  &:hover {
    background-color: #0056b3;
  }
`;

// Componente Principal
const Main: React.FC<MainProps> = ({ isSearching, searchResults }) => {
  const [cards, setCards] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSearching) {
      const fetchCards = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/movie'); // URL da sua API
          if (!response.ok) {
            throw new Error('Erro ao buscar os itens');
          }
          const data: Movie[] = await response.json();
          setCards(data); // Atualiza o estado com todos os cartões
        } catch (error) {
          console.error('Erro:', error);
        }
      };

      fetchCards();
    }
  }, [isSearching]);

  const truncateDescription = (description: string, length: number) => {
    return description.length > length
      ? description.substring(0, length) + '...'
      : description;
  };

  const handleViewMore = (id: string) => {
    navigate(`/vermais/${id}`);
  };

  if (isSearching && searchResults.length > 0) {
    return (
      <MainContainer>
        {searchResults.map((card) => (
          <Card key={card._id}>
            <CardImage src={card.poster} alt={card.title} />
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>
              {truncateDescription(card.description, 50)}
            </CardDescription>
            <h6>Autor: {card.professor}</h6>
            <ViewMoreButton onClick={() => handleViewMore(card._id)}>
              Ver mais
            </ViewMoreButton>
          </Card>
        ))}
      </MainContainer>
    );
  }

  if (isSearching) {
    return null; // Não renderiza nada se houver pesquisa ativa mas sem resultados
  }

  return (
    <MainContainer>
      {cards.map((card) => (
        <Card key={card._id}>
          <CardImage src={card.poster} alt={card.title} />
          <CardTitle>{card.title}</CardTitle>
          <CardDescription>
            {truncateDescription(card.description, 50)}
          </CardDescription>
          <h6>Autor: {card.professor}</h6>
          <ViewMoreButton onClick={() => handleViewMore(card._id)}>
            Ver mais
          </ViewMoreButton>
        </Card>
      ))}
    </MainContainer>
  );
};

export default Main;
