import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

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

interface HeaderProps {
  onSearch: (filteredCards: Movie[], isSearching: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const [query, setQuery] = useState(''); // Adiciona o estado do input de pesquisa
    const [cards, setCards] = useState<Movie[]>([]); // Declaração correta do tipo de cartões

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/movie');
                const data: Movie[] = await response.json();
                console.log('Dados da API:', data);
                setCards(data); // Atualiza o estado com todos os cartões
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };

        fetchCards();
    }, []); // Certifique-se de que esse useEffect só roda uma vez quando o componente é montado

    useEffect(() => {
        if (query.length >= 3) {
            const filtered = cards.filter(card => card.categoria.toLowerCase().includes(query.toLowerCase()));
            const uniqueFiltered = Array.from(new Set(filtered.map(card => card.title)))
                .map(title => filtered.find(card => card.title === title)) as Movie[];
            console.log('Resultados da pesquisa:', uniqueFiltered);
            onSearch(uniqueFiltered, true); // Passa os cartões filtrados e sinal de pesquisa ativa para o componente pai
        } else {
            onSearch([], false); // Limpa os cartões filtrados no componente pai e sinal de pesquisa ativa
        }
    }, [query, cards, onSearch]); // Adicionei onSearch às dependências

    return (
        <>
            <header>
                <h1>Blog-Escola</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/Lista">Lista</Link>
                    <Link to="/professores">Professores</Link>
                    <Link to="/editar">Editar</Link> {/* Adicionei o link para Editar */}
                </nav>
                <input 
                    type="text" 
                    value={query} 
                    placeholder="Pesquise por categoria" 
                    onChange={(e) => setQuery(e.target.value)} // Atualiza o estado do input com o valor digitado
                />
            </header>
        </>
    );
};

export default Header;
