# Overview

### 1. **Configuração Inicial**
- **Criação do Projeto Django**: Iniciado um novo projeto Django chamado `CineList`.
- **Configuração do Banco de Dados**: Confirmado o uso do SQLite como banco de dados padrão. As migrações foram aplicadas para configurar as tabelas padrão do Django.

### 2. **Estruturação do Projeto**
- **Criação da App "movies"**: Criada uma nova app chamada `movies` para gerenciar as funcionalidades relacionadas a filmes.
- **Registro da App**: A app `movies` foi registrada no arquivo `settings.py` do projeto, adicionando-a à lista `INSTALLED_APPS`.
- **Configuração das URLs**: Configuradas as URLs para incluir as rotas da app `movies`.

### 3. **Desenvolvimento do Back-End**
#### 3.1 Integração com a API do TMDb
- **Configuração da Chave da API**: Adicionada a chave da API do TMDb no arquivo `settings.py`.
- **Criação de Funções Auxiliares**:
  - Função `tmdb_request` criada para centralizar as chamadas à API do TMDb.
  - Funções `search_movies` e `get_movie_details` implementadas para buscar filmes por título e obter detalhes de filmes, respectivamente.

#### 3.2 Modelagem de Dados
- **Modelo `Movie`**: Criado para armazenar detalhes dos filmes favoritos, incluindo `tmdb_id`, `title`, `overview`, `release_date`, e `poster_path`.
- **Modelo `FavoriteList`**: Criado para gerenciar as listas de filmes favoritos de cada usuário. Relacionado com o modelo `Movie` e o modelo `User` do Django.

#### 3.3 Endpoints e Lógica do Back-End
- **Views Criadas**:
  - `search_view`: Para pesquisar filmes.
  - `add_to_favorites` e `remove_from_favorites`: Para adicionar ou remover filmes da lista de favoritos.
  - `favorites_view`: Para listar os filmes favoritos de um usuário.
  - `generate_shareable_link`: Para gerar um link compartilhável da lista de favoritos.
  - `shared_favorites_view`: Para exibir a lista de favoritos baseada em um link compartilhável.
- **Configuração das URLs**: URLs configuradas para mapear as views criadas.