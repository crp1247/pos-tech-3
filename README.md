Guia de Uso do Front-End



com React e utiliza React Router para gerenciar rotas. O design responsivo e as interações são implementados com styled-components e estilos em CSS.

A aplicação oferece recursos como autenticação de usuários, busca por categorias, listagem de conteúdos, edição e exclusão de postagens.

Funcionalidades Principais
1. Navegação
A navegação é gerenciada pelo componente Header, que inclui links para diferentes páginas:

Home: Exibe a página inicial com todos os posts ou resultados da pesquisa.

Lista: Mostra uma lista detalhada de posts, permitindo editar ou excluir itens.

Professores: Uma rota protegida acessível apenas a usuários autenticados.

Editar: Um formulário para editar as informações de uma postagem existente.

2. Busca
O campo de busca no Header permite filtrar posts por categorias. A pesquisa é:

Ativada quando o usuário digita pelo menos 3 caracteres.

Baseada em dados fornecidos pela API.

Os resultados são enviados para a página principal (Main) para exibição.

3. Autenticação
A autenticação é realizada na página de Login, onde:

O usuário insere o e-mail e a senha.

A aplicação verifica as credenciais através de uma API.

O token gerado é salvo no localStorage junto com a data de expiração.

Rotas protegidas validam o token antes de conceder acesso.

4. Listagem de Posts
A página Lista exibe todos os posts cadastrados com as seguintes opções:

Editar: Redireciona para o formulário de edição.

Deletar: Envia uma requisição DELETE para a API e remove o item da lista após confirmação.

Os dados são buscados diretamente da API ao carregar a página.

5. Edição de Posts
A página Editar permite:

Buscar uma postagem pelo ID fornecido.

Atualizar campos como título, descrição, categoria e mais.

Submeter as alterações através de uma requisição PATCH para a API.

6. Página Inicial
O componente Main exibe:

Uma lista de posts buscados da API.

Os resultados filtrados da pesquisa, quando aplicável.

Um botão "Ver mais" para detalhes adicionais (gerenciado por rotas).

7. Rotas Privadas
Rotas como Professores, Editar e Lista estão protegidas:

O acesso é condicionado à existência de um token de autenticação válido.

Fluxo de Funcionamento
Usuário acessa a aplicação:

A página inicial lista os posts ou apresenta os resultados de uma busca ativa.

Usuário realiza login:

Caso acesse uma rota protegida sem login, será redirecionado para a página de login.

Após o login, o usuário é redirecionado para a página original ou para o padrão (/professores).

Usuário navega pelas funcionalidades:

Pode buscar posts por categorias, visualizar a lista completa, editar ou excluir itens.

Interações com a API:

Todas as operações de CRUD (criar, ler, atualizar e deletar) são feitas através de chamadas HTTP para a API, garantindo persistência.

Design e Estilização
Responsividade:

Layout adaptável a diferentes tamanhos de tela.

Margens e tamanhos ajustados para dispositivos móveis.

Estilização:

Uso de styled-components para criar componentes reutilizáveis com estilos encapsulados.

Complemento com CSS em arquivos dedicados para estilos globais.
