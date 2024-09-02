# API Endpoints para Gerenciamento de Usuários

Este documento descreve os endpoints de API disponíveis para registro, login e gerenciamento de usuários na aplicação. As respostas são no formato JSON.

## Base URL

- **Base URL**: `http://seu-dominio.com/api/users/`

## Endpoints

### 1. Registro de Usuário

- **URL**: `/register/`
- **Método**: `POST`
- **Descrição**: Registra um novo usuário no sistema.

#### Parâmetros de Requisição (JSON):

```json
{
  "username": "seu_username",
  "email": "seu_email@example.com",
  "password": "sua_senha"
}
```

#### Exemplo de Resposta de Sucesso (JSON):

```json

{
  "user": {
    "id": 1,
    "username": "seu_username",
    "email": "seu_email@example.com"
  },
  "token": "abcdefghij1234567890"
}
```
#### Possíveis Erros:

    400 Bad Request: Quando os dados enviados são inválidos ou faltam informações necessárias.

### 2. Login de Usuário

    URL: /login/
    Método: POST
    Descrição: Autentica um usuário e retorna um token de autenticação.

#### Parâmetros de Requisição (JSON):

```json

{
  "username": "seu_username",
  "password": "sua_senha"
}
```
#### Exemplo de Resposta de Sucesso (JSON):

```json

{
  "user": {
    "id": 1,
    "username": "seu_username",
    "email": "seu_email@example.com"
  },
  "token": "abcdefghij1234567890"
}
```

### Possíveis Erros:

- 400 Bad Request: Quando as credenciais são inválidas ou não foram fornecidas corretamente.

### Autenticação

- Autenticação: Após o login, o front-end deve incluir o token de autenticação em todas as requisições subsequentes que requerem autenticação.
  - Cabeçalho de Autenticação: Authorization: Token abcdefghij1234567890

### Observações

- Todos os tokens são sensíveis e devem ser armazenados de forma segura no front-end (por exemplo, usando o localStorage ou sessionStorage).
- Certifique-se de que as requisições sejam feitas usando https em produção para proteger os dados dos usuários.