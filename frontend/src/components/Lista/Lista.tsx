import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

// Styled Components
const ListaContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f50707;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 100px;

  @media (max-width: 750px) {
    margin-top: 200px;
  }
`;

const PostsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PostItem = styled.li`
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 750px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PostImage = styled.img`
  width: 300px;
  height: auto;
  margin-right: 20px;

  @media (max-width: 750px) {
    width: 200px;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PostTitle = styled.h2`
  margin: 5px 0;
`;

const PostSubtitle = styled.h3`
  margin: 5px 0;
`;

const PostDescription = styled.p`
  margin: 5px 0;
`;

const PostSpan = styled.span`
  font-weight: bold;
`;

const Buttons = styled.div`
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #02fd30;
  color: #0b0b0b;
  font-size: 1em;
  cursor: pointer;
  margin-right: 10px;
  font-weight: bold;

  &:hover {
    background-color: #c00;
  }

  @media (max-width: 750px) {
    font-size: 0.9em;
    padding: 8px;
  }
`;

// Componente Principal
const Lista: React.FC = () => {
  const [posts, setPosts] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/movie');
      if (!response.ok) {
        throw new Error('Erro ao buscar os posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleEdit = (postId: string) => {
    navigate(`/editar?id=${postId}`);
  };

  const truncateDescription = (description: string, length: number) => {
    return description.length > length ? description.substring(0, length) + '...' : description;
  };

  const handleDelete = async (postId: string) => {
    const confirmDelete = window.confirm('Tem certeza de que deseja deletar esta postagem?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/movie/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
      }

      alert('Postagem deletada com sucesso!');
      fetchPosts(); // Atualiza a lista de posts
    } catch (error) {
      alert(`Erro ao deletar postagem: ${error}`);
    }
  };

  return (
    <ListaContainer>
      <h1>Lista de Postagens</h1>
      <PostsList>
        {posts.map(post => (
          <PostItem key={post._id}>
            <PostImage src={post.poster} alt={post.title} />
            <TextContainer>
              <PostTitle>
                <PostSpan>ID:</PostSpan> {post._id}
              </PostTitle>
              <PostSubtitle>
                <PostSpan>Título:</PostSpan> {post.title}
              </PostSubtitle>
              <PostDescription>
                <PostSpan>Descrição:</PostSpan> {truncateDescription(post.description, 50)}
              </PostDescription>
              <PostDescription>
                <PostSpan>Categoria:</PostSpan> {post.categoria}
              </PostDescription>
              <PostDescription>
                <PostSpan>Professor:</PostSpan> {post.professor}
              </PostDescription>
              <Buttons>
                <Button onClick={() => handleEdit(post._id)}>Editar</Button>
                <Button onClick={() => handleDelete(post._id)}>Deletar</Button>
              </Buttons>
            </TextContainer>
          </PostItem>
        ))}
      </PostsList>
    </ListaContainer>
  );
};

export default Lista;
