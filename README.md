Aqui está uma versão melhorada do seu arquivo README, estruturado e formatado para ajudar outros desenvolvedores a entender e configurar o projeto rapidamente:

---

# Cinelist

Cinelist é uma aplicação que permite aos usuários explorar filmes, criar listas de favoritos e compartilhar suas preferências. Este projeto é dividido em back-end (Django) e front-end (React).

## Índice
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Iniciando o Servidor](#iniciando-o-servidor)
- [Deploy](#deploy)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Pré-requisitos

Certifique-se de ter os seguintes programas instalados:

- **Python** 3.x
- **Node.js** e **npm**
- **Virtualenv** para o ambiente virtual do Python

## Instalação

### Back-end (Django)

1. Clone o repositório:

   ```bash
   git clone https://github.com/lpcampanholi/Cinelist.git
   cd Cinelist
   ```

2. Crie e ative o ambiente virtual:

   ```bash
   python -m venv .venv
   .\.venv\Scripts\activate  # Windows
   source .venv/bin/activate  # macOS/Linux
   ```

3. Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```

### Front-end (React)

1. Navegue até a pasta do front-end:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

## Configuração

### Arquivo `.env` para o Front-end

Crie um arquivo `.env` na raiz do projeto **front-end** com as seguintes variáveis:

```env
VITE_BACKEND_URL=http://localhost:8000
VITE_FRONTEND_URL=http://localhost:3000
```

### Arquivo `.env` para o Projeto

Crie um arquivo `.env` na raiz do projeto principal com as seguintes variáveis:

```env
TMDB_API_KEY=0986cb10dbfaccff3df749d1136152c9
TMDB_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTg2Y2IxMGRiZmFjY2ZmM2RmNzQ5ZDExMzYxNTJjOSIsIm5iZiI6MTcyNDc4MzQyOC40NzM4NjYsInN1YiI6IjY2Y2UwNTE4ZjRhOGY5MDIzN2M1N2MwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-aFJ6PHVxsPR2b_WCi_xJLrtRl2oZRSCstHyAJoBn_o
SECRET_KEY=django-insecure-s150xyq#8t)2cpuqn98t*^smz0vgxeos**vn1i0y0x45_!d+1&
```

> **Nota:** Não compartilhe o arquivo `.env` publicamente, pois ele contém chaves sensíveis.

## Iniciando o Servidor

### Back-end (Django)

Para iniciar o servidor Django:

```bash
cd Cinelist
.\.venv\Scripts\activate  # Ative o ambiente virtual
python manage.py runserver
```

O servidor estará disponível em `http://localhost:8000`.

### Front-end (React)

Para iniciar o servidor de desenvolvimento do React:

```bash
cd frontend
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.
