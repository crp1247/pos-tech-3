import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Editar.css';

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

const Editar: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [postId, setPostId] = useState<string | null>(searchParams.get('id')); // Tornamos o postId editável
  const [post, setPost] = useState<Movie | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoria, setCategoria] = useState('');
  const [poster, setPoster] = useState('');
  const [professor, setProfessor] = useState('');
  const [stars, setStars] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    }
  }, [postId]);

  const fetchPost = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/movie/${id}`);
      const result = await response.json();
      if (response.ok) {
        setPost(result);
        setTitle(result.title);
        setDescription(result.description);
        setCategoria(result.categoria);
        setPoster(result.poster);
        setProfessor(result.professor);
        setStars(result.stars.join(', '));
        setResponseMessage('');
      } else {
        setResponseMessage('Postagem não encontrada.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setResponseMessage(`Erro: ${error.message}`);
      } else {
        setResponseMessage('Erro desconhecido.');
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!post) return;

    const updatedPost = {
      title,
      description,
      categoria,
      poster,
      professor,
      stars: stars.split(',').map(star => star.trim()),
    };

    try {
      const response = await fetch(`http://localhost:3000/api/movie/${post._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage('Postagem atualizada com sucesso!');
        setTimeout(() => {
          setResponseMessage('');
          setPost(null);
          setTitle('');
          setDescription('');
          setCategoria('');
          setPoster('');
          setProfessor('');
          setStars('');
          setPostId(null);
        }, 3000); // Ocultar mensagem após 3 segundos e limpar os campos
      } else {
        setResponseMessage(`Erro: ${result.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setResponseMessage(`Erro: ${error.message}`);
      } else {
        setResponseMessage('Erro desconhecido.');
      }
    }
  };

  return (
    <div className="editar-container">
      <h1>Editar Postagem</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Digite o ID da postagem"
          value={postId || ''}
          onChange={(e) => setPostId(e.target.value)} // Permite que o ID seja editado diretamente no input
        />
        <button onClick={() => postId && fetchPost(postId)}>Buscar</button>
      </div>

      {responseMessage && <div className="response-message">{responseMessage}</div>}

      {post && (
        <form onSubmit={handleSubmit} className="editar-form">
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label htmlFor="categoria">Categoria</label>
          <input
            id="categoria"
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />

          <label htmlFor="poster">URL do Poster</label>
          <input
            id="poster"
            type="text"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
            required
          />

          <label htmlFor="professor">Professor</label>
          <input
            id="professor"
            type="text"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
            required
          />

          <button type="submit">Atualizar Postagem</button>
        </form>
      )}
    </div>
  );
};

export default Editar;
