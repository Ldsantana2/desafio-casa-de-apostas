# Desafio Fullstack — Cadastro de Clientes e Contatos

Projeto desenvolvido como solução para o desafio técnico Fullstack Junior/Pleno.

O sistema permite:

- autenticação de usuários
- cadastro de clientes
- cadastro de contatos
- relacionamento entre clientes e contatos
- visualização em relatório
- CRUD completo
- autenticação JWT

---

# Tecnologias Utilizadas

## Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- bcryptjs
- CORS
- dotenv

## Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- Axios
- React Router DOM

---

# Estrutura do Projeto

```txt
desafio-casa-de-apostas/
│
├── backend/
│
└── frontend/
```

---

# Funcionalidades

## Login

- criar conta
- autenticar usuário
- JWT
- logout

## Clientes

- criar cliente
- listar clientes
- editar cliente
- excluir cliente

## Contatos

- criar contato
- listar contatos
- editar contato
- excluir contato

## Relatório

- listagem de clientes
- listagem de contatos vinculados

---

# Banco de Dados

## Relacionamentos

```txt
Client 1:N Contact
```

Um cliente pode possuir vários contatos.

---

# Backend

## Instalação

Entre na pasta backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

---

# Configuração do .env

Crie um arquivo:

```txt
.env
```

Conteúdo:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/clientes"
JWT_SECRET="secret"
```

---

# Rodar migrations

```bash
npx prisma migrate dev
```

---

# Gerar Prisma Client

```bash
npx prisma generate
```

---

# Rodar backend

```bash
npm run dev
```

Servidor:

```txt
http://localhost:3333
```

---

# Rotas da API

## Auth

### Criar usuário

```http
POST /auth/register
```

Body:

```json
{
  "email": "admin@email.com",
  "password": "123456"
}
```

---

### Login

```http
POST /auth/login
```

Body:

```json
{
  "email": "admin@email.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "token": "jwt-token"
}
```

---

# Rotas protegidas

Enviar header:

```txt
Authorization: Bearer TOKEN
```

---

# Clientes

## Criar cliente

```http
POST /clients
```

## Listar clientes

```http
GET /clients
```

## Atualizar cliente

```http
PUT /clients/:id
```

## Excluir cliente

```http
DELETE /clients/:id
```

---

# Contatos

## Criar contato

```http
POST /contacts
```

## Listar contatos

```http
GET /contacts
```

## Atualizar contato

```http
PUT /contacts/:id
```

## Excluir contato

```http
DELETE /contacts/:id
```

---

# Frontend

## Instalação

Entre na pasta frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

---

# Rodar frontend

```bash
npm run dev
```

Frontend disponível em:

```txt
http://localhost:5173
```

---

# Páginas do Sistema

## Login

```txt
/
```

Funcionalidades:

- login
- criação de conta

---

## Clientes

```txt
/clients
```

Funcionalidades:

- cadastro de clientes
- listagem de clientes
- exclusão de clientes

---

## Contatos

```txt
/contacts
```

Funcionalidades:

- cadastro de contatos
- vínculo com cliente
- listagem de contatos
- exclusão de contatos

---

## Relatórios

```txt
/reports
```

Funcionalidades:

- visualização de clientes
- visualização dos contatos vinculados

---

# Segurança

O sistema utiliza:

- JWT Authentication
- Middleware de autenticação
- Rotas protegidas
- Senhas criptografadas com bcrypt

---

# Autor

Projeto desenvolvido por Lucas Dantas.
