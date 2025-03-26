import React, { useState } from 'react';
import './Professores.css'; // Certifique-se de criar um arquivo CSS correspondente para estilizar os inputs

const Professores: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoria, setCategoria] = useState('');
  const [poster, setPoster] = useState('');
  const [professor, setProfessor] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newPost = {
      title,
      description,
      categoria,
      poster,
      professor,
    };

    try {
      const response = await fetch('http://localhost:3000/api/movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar a postagem');
      }

      const result = await response.json();
      console.log('Postagem criada:', result);

      // Limpar campos do formulário
      setTitle('');
      setDescription('');
      setCategoria('');
      setPoster('');
      setProfessor('');

      // Mostrar mensagem de sucesso
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000); // Ocultar mensagem após 3 segundos
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="professores-container">
      <h1>Criar Postagem</h1>
      <form onSubmit={handleSubmit} className="professores-form">
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

        <button type="submit">Criar Postagem</button>
      </form>

      {showSuccess && (
        <div className="success-popup">Postagem criada com sucesso!</div>
      )}
    </div>
  );
};

export default Professores;
