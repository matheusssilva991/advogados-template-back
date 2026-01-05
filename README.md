# Advogados Template - Backend

<span id="topo"></span>

<img src="./assets/scaleIcon.svg" alt="Capa" width="35%">

> Sistema completo de gestão de processos jurídicos desenvolvido com NestJS, TypeScript e MySQL

## 🚩 Informações do Projeto

![Status do projeto](https://img.shields.io/badge/status-finalizado-red)
![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![NestJS](https://img.shields.io/badge/NestJS-10.0.0-E0234E)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)

Sistema backend completo para gerenciamento de processos jurídicos, oferecendo funcionalidades para advogados e escritórios de advocacia. O projeto foi desenvolvido com arquitetura modular, seguindo as melhores práticas de desenvolvimento com NestJS.

### 🎯 Principais Funcionalidades

- **Gestão de Usuários**: Cadastro e gerenciamento de advogados com níveis de acesso diferenciados
- **Gestão de Processos**: Controle completo de processos jurídicos com categorias e status
- **Sistema de Revisão**: Fluxo de requisição e resposta de revisões de processos
- **Gerenciamento de Documentos**: Upload e controle de documentos relacionados aos processos
- **Autenticação JWT**: Sistema seguro de autenticação com tokens armazenados em cookies
- **Controle de Acesso**: Guards personalizados para diferentes níveis de permissão
- **Relatórios em PDF**: Geração de relatórios detalhados de processos
- **Especialidades**: Sistema de categorização de especialidades por advogado

## 📋 Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo para aplicações server-side
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[TypeORM](https://typeorm.io/)** - ORM para TypeScript e JavaScript
- **[MySQL](https://www.mysql.com/)** - Sistema de gerenciamento de banco de dados
- **[JWT](https://jwt.io/)** - JSON Web Tokens para autenticação
- **[Passport](http://www.passportjs.org/)** - Middleware de autenticação
- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Biblioteca para hash de senhas
- **[PDFKit](https://pdfkit.org/)** - Geração de documentos PDF
- **[Docker](https://www.docker.com/)** - Containerização da aplicação

## 💻 Pré-requisitos

Antes de começar, verifique se você possui:

- **Node.js** versão 18.x ou superior
- **npm** versão 9.x ou superior
- **MySQL** versão 8.0 ou superior
- **Docker** e **Docker Compose** (opcional, para execução via containers)
- Sistema operacional: **Windows**, **Linux** ou **macOS**

## 🚀 Instalação

### Instalação Local (sem Docker)

1. **Verifique as versões do Node.js e npm:**

```bash
node -v && npm --version
```

1. **Caso não tenha o Node.js instalado:**

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install nodejs npm
```

**macOS (com Homebrew):**

```bash
brew install node
```

**Windows:**
Baixe o instalador em [nodejs.org](https://nodejs.org/)

1. **Instale o NestJS CLI globalmente:**

```bash
npm install -g @nestjs/cli
```

1. **Clone o repositório e instale as dependências:**

```bash
git clone <url-do-repositorio>
cd advogados-template-back
npm install
```

1. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto com base no exemplo abaixo:

```env
# Ambiente
ENV=development

# Servidor
PORT=3333

# Segurança
SECRET_KEY=sua_chave_secreta_aqui
ACCESS_TOKEN_EXPIRATION=86400

# Frontend
FRONTEND_URL=http://localhost:3000

# Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=advogados-template
```

1. **Configure o banco de dados MySQL:**

Execute o script SQL localizado em `dev_files/advogados-template.sql` no seu MySQL.

1. **Execute as migrations (se houver):**

```bash
npm run migration:run
```

### Instalação com Docker

1. **Certifique-se de ter o Docker e Docker Compose instalados:**

```bash
docker --version && docker-compose --version
```

1. **Inicie os containers:**

```bash
docker-compose up -d
```

O Docker irá criar automaticamente os containers para a aplicação e o banco de dados MySQL.

## ☕ Executando o Projeto

### Modo Desenvolvimento

```bash
npm run start:dev
```

O servidor iniciará em modo watch, reiniciando automaticamente ao detectar alterações nos arquivos.

### Modo Produção

```bash
# Build da aplicação
npm run build

# Executar a aplicação buildada
npm run start:prod
```

### Modo Debug

```bash
npm run start:debug
```

### Com Docker

```bash
docker-compose up
```

Acesse a API em: `http://localhost:3333`

## 📦 Estrutura do Projeto

```
advogados-template-back/
├── src/
│   ├── common/                    # Recursos compartilhados
│   │   ├── decorators/           # Decorators personalizados
│   │   ├── enums/                # Enumerações (Role, Status)
│   │   └── guards/               # Guards de autenticação e autorização
│   ├── modules/                  # Módulos da aplicação
│   │   ├── auth/                 # Autenticação JWT
│   │   ├── user/                 # Gestão de usuários
│   │   ├── category/             # Categorias de processos
│   │   ├── specialty/            # Especialidades dos advogados
│   │   ├── process/              # Gestão de processos
│   │   ├── process-documents/    # Documentos de processos
│   │   ├── revision-request/     # Requisições de revisão
│   │   ├── revision-request-documents/
│   │   ├── revision-response/    # Respostas de revisão
│   │   ├── revision-response-documents/
│   │   └── file/                 # Serviço de arquivos
│   ├── app.module.ts             # Módulo principal
│   └── main.ts                   # Arquivo de inicialização
├── db/                           # Configuração do banco de dados
├── dev_files/                    # Arquivos de desenvolvimento
│   ├── advogados-template.sql   # Script SQL inicial
│   └── *.postman_collection.json # Coleção do Postman
├── upload/                       # Diretório de uploads
├── docker-compose.yml            # Configuração Docker
└── package.json                  # Dependências do projeto
```

## 🔐 Níveis de Acesso

O sistema possui três níveis de acesso:

1. **Admin**: Acesso total ao sistema
2. **Lawyer**: Acesso a processos e criação de requisições de revisão
3. **User**: Acesso básico de visualização

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Cobertura de testes
npm run test:cov

# Testes e2e
npm run test:e2e
```

## 📚 Scripts Disponíveis

```bash
npm run build              # Build da aplicação
npm run format             # Formatar código com Prettier
npm run start              # Iniciar em modo padrão
npm run start:dev          # Iniciar em modo desenvolvimento
npm run start:debug        # Iniciar em modo debug
npm run start:prod         # Iniciar em modo produção
npm run lint               # Verificar código com ESLint
npm run migration:generate # Gerar nova migration
npm run migration:run      # Executar migrations
npm run migration:revert   # Reverter última migration
```

## 📖 Documentação da API

A documentação completa da API está disponível via Postman Collection em `dev_files/Projeto Advogados Template.postman_collection.json`.

### Endpoint Base

```
http://localhost:3333/api
```

### Principais Endpoints

Para detalhes completos de cada endpoint, consulte as seções abaixo ou importe a collection do Postman.

#### 🔐 Autenticação

<details>
<summary><code>POST</code> <code><b>/api/login</b></code> <code>(Autentica o usuário e salva o token no cookie)</code></summary>

#### • Body

> | name       | type     | data type | description      |
> | ---------- | -------- | --------- | ---------------- |
> | `email`    | required | string    | Email de usuário  |
> | `password` | required | string    | Senha do usuário |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"success": true, "accessToken": Bearer Token`        |
> | `401`     | `application/json` | `{"code":"400","msg":"Email e/ou senha incorreta"}` |

</details>

<details>
<summary><code>POST</code> <code><b>/api/logout</b></code> <code>(Realiza o logout)</code></summary>

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"message": "Deslogado com sucesso."`|
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

---

### • Usuários

<details>

<summary><code>GET</code> <code><b>/api/users</b></code> <code>(Retorna os usuários)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Query

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `name`  | opcional | string    | Nome do usuário |
> | `nroOAB` | opcional | string   | Número da oab |
> | `role` | opcional | string    | Cargo do usuário |
> | `limit` | opcional | number    | Limite de registros por página |
> | `page` | opcional | number    | Página |
> | `sort` | opcional | object   | Chaves de ordenação |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "users": [Users]}`      |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>GET</code> <code><b>/api/user/:id</b></code> <code>(Retorna um usuário)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID do usuário |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "user": User}`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg":"Usuário não encontrado."}` |

</details>

<details>

<summary><code>POST</code> <code><b>/api/user</b></code> <code>(Cria um usuário)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `name` | required | string    | Nome do usuário |
> | `email` | required | string    | E-mail do usuário |
> | `phoneNumber` | optional | string    | Telefone do usuário |
> | `password` | required | string    | Senha do usuário |
> | `nroOAB` | optional | string    | Número da OAB do usuário |
> | `role` | optional | string    | Cargo do usuário |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "user": CreadtedUser }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>PATCH</code> <code><b>/api/user/:id</b></code> <code>(Atualiza um usuário)</code></summary>

#### • Auth (Nível de Acesso - Lawyer+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID do usuário |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `name` | optional | string    | Nome do usuário |
> | `email` | optional | string    | E-mail do usuário |
> | `phoneNumber` | optional | string    | Telefone do usuário |
> | `password` | optional | string    | Senha do usuário |
> | `nroOAB` | optional | string    | Número da OAB do usuário |
> | `role` | optional | string    | Cargo do usuário |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "user": UpdatedUser }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg":"Usuário não encontrado."}` |

</details>

<details>

<summary><code>DELETE</code> <code><b>/api/user/:id</b></code> <code>(Deleta um usuário)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID do usuário |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "user": DeletedUser }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg":"Usuário não encontrado."}` |

</details>

---

### • Categorias

<details>

<summary><code>GET</code> <code><b>/api/categories</b></code> <code>(Retorna as categorias)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Query

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `limit` | opcional | number    | Limite de registros por página |
> | `page` | opcional | number    | Página |
> | `sort` | opcional | object   | Chaves de ordenação |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "categories": [Categoriy]}`      |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>GET</code> <code><b>/api/category/:id</b></code> <code>(Retorna uma categoria)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID da categoria |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "category": Category}`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg":"Categoria não encontrada."}` |

</details>

<details>

<summary><code>POST</code> <code><b>/api/category</b></code> <code>(Cria uma categoria)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `name` | required | string    | Nome da categoria |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "category": CreatedCategory }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>PATCH</code> <code><b>/api/category/:id</b></code> <code>(Atualiza uma categoria)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID da categoria |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `name` | optional | string    | Nome da categoria |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "category": UpdatedCategory }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg":"Categoria não encontrada."}` |

</details>

<details>

<summary><code>DELETE</code> <code><b>/api/category/:id</b></code> <code>(Deleta uma categoria)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID da categoria |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "category": DeletedCategory }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg":"Categoria não encontrada."}` |

</details>

---

### • Especialidades

<details>

<summary><code>GET</code> <code><b>/api/specialties</b></code> <code>(Retorna as especialidades)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Query

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `user`  | opcional | string    | ID do usuário |
> | `category` | opcional | string   | ID da categoria |
> | `withUser` | opcional | bolean   | Trazer ou não dados de usuário |
> | `withCategory` | opcional | bolean   | Trazer ou não dados da categoria |
> | `limit` | opcional | number    | Limite de registros por página |
> | `page` | opcional | number    | Página |
> | `sort` | opcional | object   | Chaves de ordenação |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "specialties": [Specialty]}`      |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>GET</code> <code><b>/api/specialty/:id</b></code> <code>(Retorna uma especialidade)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID da especialidade |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "specialty": Specialty}`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg": "Especialidade não encontrada."}` |

</details>

<details>

<summary><code>POST</code> <code><b>/api/specialty</b></code> <code>(Cria uma especialidade)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `affinity` | required | number    | Nível de especialidade do usuário |
> | `userId` | required | string    | ID do usuário |
> | `categoryId` | optional | string    | ID da categoria |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "specialty": CreadtedSpecialty }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>PATCH</code> <code><b>/api/specialty/:id</b></code> <code>(Atualiza uma especialidade)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID da especialidade |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `affinity` | optional | number    | Nível de especialidade do usuário |
> | `userId` | optional | string    | ID do usuário |
> | `categoryId` | optional | string    | ID da categoria |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "specialty": UpdatedSpecialty }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg": "Especialidade não encontrada."}` |

</details>

<details>

<summary><code>DELETE</code> <code><b>/api/specialty/:id</b></code> <code>(Deleta uma especialidade)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID da especialidade |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "specialty": DeletedSpecialty }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

---

### • Processos

<details>

<summary><code>GET</code> <code><b>/api/processes</b></code> <code>(Retorna os processos)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Query

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `processKey`  | opcional | string    | Chave do processo |
> | `name`  | opcional | string    | Nome do cliente |
> | `matter`  | opcional | string    | Matéria do processo |
> | `description`  | opcional | string    | Descrição do processo |
> | `beginningDistributionDate`  | opcional | Date  | Data de distribuição inicial do processo |
> | `endDistributionDate`  | opcional | Date  | Data de distribuição final do processo |
> | `beginningConclusionDate`  | opcional | Date  | Data de conclusão inicial do processo |
> | `endConclusionDate`  | opcional | Date  | Data de conclusão final do processo |
> | `beginningDeadline`  | opcional | Date  | Data de prazo inicial do processo |
> | `endDeadline`  | opcional | Date  | Data de prazo final do processo |
> | `status`  | opcional | string    | Status do processo |
> | `isUrgent`  | opcional | number    | Se o processo é urgente ou não |
> | `user`  | opcional | number    | ID do usuário |
> | `category` | opcional | number   | ID da categoria |
> | `withUser` | opcional | bolean   | Trazer ou não dados de usuário |
> | `withCategory` | opcional | bolean   | Trazer ou não dados da categoria |
> | `limit` | opcional | number    | Limite de registros por página |
> | `page` | opcional | number    | Página |
> | `sort` | opcional | object   | Chaves de ordenação |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "processes": [Process]}`      |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>GET</code> <code><b>/api/process/:id</b></code> <code>(Retorna uma processo)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID do processo |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "process": Process}`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg": "Processo não encontrado."}` |

</details>

<details>

<summary><code>GET</code> <code><b>/api/processes-report</b></code> <code>(Retorna o PDF do relatório)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Query

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `processKey`  | opcional | string    | Chave do processo |
> | `name`  | opcional | string    | Nome do cliente |
> | `matter`  | opcional | string    | Matéria do processo |
> | `description`  | opcional | string    | Descrição do processo |
> | `beginningDistributionDate`  | opcional | Date  | Data de distribuição inicial do processo |
> | `endDistributionDate`  | opcional | Date  | Data de distribuição final do processo |
> | `beginningConclusionDate`  | opcional | Date  | Data de conclusão inicial do processo |
> | `endConclusionDate`  | opcional | Date  | Data de conclusão final do processo |
> | `beginningDeadline`  | opcional | Date  | Data de prazo inicial do processo |
> | `endDeadline`  | opcional | Date  | Data de prazo final do processo |
> | `status`  | opcional | string    | Status do processo |
> | `isUrgent`  | opcional | number    | Se o processo é urgente ou não |
> | `user`  | opcional | number    | ID do usuário |
> | `category` | opcional | number   | ID da categoria |
> | `withUser` | opcional | bolean   | Trazer ou não dados de usuário |
> | `limit` | opcional | number    | Limite de registros por página |
> | `page` | opcional | number    | Página |
> | `sort` | opcional | object   | Chaves de ordenação |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "report": Buffer}`      |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>GET</code> <code><b>/api/processes-report-filter-values</b></code> <code>(Retorna os valores para o filtro do relatório)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "filterValues": FilterValues}`      |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>POST</code> <code><b>/api/process</b></code> <code>(Cria um processo)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `processKey`  | required | string    | Chave do processo |
> | `name`  | opcional | string    | Nome do cliente |
> | `matter`  | opcional | string    | Matéria do processo |
> | `description`  | opcional | string    | Descrição do processo |
> | `distributionDate`  | opcional | Date  | Data de distribuição do processo |
> | `conclusionDate`  | opcional | Date  | Data de conclusão do processo |
> | `deadline`  | opcional | Date  | Data de prazo do processo |
> | `status`  | opcional | string    | Status do processo |
> | `legalOpinion`  | opcional | string    | Parecer do processo |
> | `isUrgent`  | opcional | number    | Se o processo é urgente ou não |
> | `userId`  | opcional | number    | ID do usuário |
> | `categoryId` | required | number   | ID da categoria |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "process": CreadtedProcess }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>PATCH</code> <code><b>/api/process/:id</b></code> <code>(Atualiza um processo)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID do processo |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `processKey`  | optional | string    | Chave do processo |
> | `name`  | opcional | string    | Nome do cliente |
> | `matter`  | opcional | string    | Matéria do processo |
> | `description`  | opcional | string    | Descrição do processo |
> | `distributionDate`  | opcional | Date  | Data de distribuição do processo |
> | `conclusionDate`  | opcional | Date  | Data de conclusão do processo |
> | `deadline`  | opcional | Date  | Data de prazo do processo |
> | `status`  | opcional | string    | Status do processo |
> | `legalOpinion`  | opcional | string    | Parecer do processo |
> | `isUrgent`  | opcional | number    | Se o processo é urgente ou não |
> | `userId`  | opcional | number    | ID do usuário |
> | `categoryId` | optional | number   | ID da categoria |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "process": UpdatedProcess }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg": "Processo não encontrado."}` |

</details>

<details>

<summary><code>PATCH</code> <code><b>/api/processes</b></code> <code>(Atualiza processos)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `ids`  | opcional | number[]    | IDs dos processos |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "processos": UpdatedProcesses }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg": "Processo não encontrado."}` |

</details>

<details>

<summary><code>DELETE</code> <code><b>/api/process/:id</b></code> <code>(Deleta um processo)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID do processo |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "process": DeletedProcess }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>DELETE</code> <code><b>/api/processes</b></code> <code>(Deleta processos)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Body

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `ids`   | required | number[]   | IDs dos procesos |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "processes": DeletedProcesses }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

---

### • Documentos de processo

<details>

<summary><code>GET</code> <code><b>/api/process-documents</b></code> <code>(Retorna os documentos de processo)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Query

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `process` | opcional | number   | ID do processo |
> | `withProcess` | opcional | bolean   | Trazer ou não dados do processo |
> | `limit` | opcional | number    | Limite de registros por página |
> | `page` | opcional | number    | Página |
> | `sort` | opcional | object   | Chaves de ordenação |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "processDocuments": [ProcessDocument]}`      |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>GET</code> <code><b>/api/process-document/:id</b></code> <code>(Retorna um documento de processo)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID do documento de processo |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "processDocument": ProcessDocument}`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg": "Documento de processo não encontrado."}` |

</details>

<details>

<summary><code>POST</code> <code><b>/api/process-document</b></code> <code>(Cria um documento de processo)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `file`  | required | File    | Arquivo do processo |
> | `processId` | required | number   | ID do processo |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "processDocument": CreadtedProcessDocument }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>PATCH</code> <code><b>/api/process-document/:id</b></code> <code>(Atualiza um documento de processo)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID do documento de processo |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `file`  | optional | File    | Arquivo do processo |
> | `processId` | optional | number   | ID do processo |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "processDocument": UpdatedProcessDocument }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg": "Documento de processo não encontrado."}` |

</details>

<details>

<summary><code>DELETE</code> <code><b>/api/process-document/:id</b></code> <code>(Deleta um documento de processo)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID do documento de processo |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "processDocument": DeletedProcessDocument }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

---

### • Requisição de revisão

<details>

<summary><code>GET</code> <code><b>/api/revision-requests</b></code> <code>(Retorna as requisições de revisão)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Query

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `title` | opcional | string  | Titulo da requisição de revisão |
> | `description` | opcional | string   | Descrição da requisição de revisão |
> | `process` | opcional | number   | ID do processo |
> | `withProcess` | opcional | bolean   | Trazer ou não dados do processo |
> | `limit` | opcional | number    | Limite de registros por página |
> | `page` | opcional | number    | Página |
> | `sort` | opcional | object   | Chaves de ordenação |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "revisionRequest": [RevisionRequest]}`      |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>GET</code> <code><b>/api/revision-request/:id</b></code> <code>(Retorna uma requisição de revisão)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID da requisição de revisão |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "revisionRequest": RevisionRequest}`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg": "Requisição de revisão não encontrada."}` |

</details>

<details>

<summary><code>POST</code> <code><b>/api/revision-request</b></code> <code>(Cria uma requisição de revisão)</code></summary>

#### • Auth (Nível de Acesso - Lawyer)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `title`  | required | string  | Titulo da requisição de revisão |
> | `description`  | required | string | Descrição da requisição de revisão |
> | `processId` | required | number   | ID do processo |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "revisionRequest": CreadtedRevisionRequest }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>PATCH</code> <code><b>/api/revision-request/:id</b></code> <code>(Atualiza uma requisição de revisão)</code></summary>

#### • Auth (Nível de Acesso - Lawyer)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID da requisição de revisão |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `title`  | optional | string  | Titulo da requisição de revisão |
> | `description`  | optional | string | Descrição da requisição de revisão |
> | `processId` | optional | number   | ID do processo |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "revisionRequest": UpdatedRevisionRequest }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg": "Requisição de revisão não encontrada."}` |

</details>

<details>

<summary><code>DELETE</code> <code><b>/api/revision-request/:id</b></code> <code>(Deleta uma requisição de revisão)</code></summary>

#### • Auth (Nível de Acesso - Lawyer)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID da requisição de revisão |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "revisionRequest": DeletedRevisionRequest }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

---

### • Documentos de Requisição de revisão

<details>

<summary><code>GET</code> <code><b>/api/revision-request-documents</b></code> <code>(Retorna os documentos de requisição de revisão)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Query

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `revisionRequest` | opcional | number   | ID da requisição de revisão |
> | `process` | opcional | number   | ID do processo |
> | `withRevisionRequest` | opcional | bolean   | Trazer ou não dados da requisição de revisão |
> | `limit` | opcional | number    | Limite de registros por página |
> | `page` | opcional | number    | Página |
> | `sort` | opcional | object   | Chaves de ordenação |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "revisionRequestDocuments": [RevisionRequestDocument]}`      |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>GET</code> <code><b>/api/revision-request-document/:id</b></code> <code>(Retorna um documento de requisição de revisão)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID do documento de requisição de revisão |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "revisionRequestDocument": RevisionRequestDocument}`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg": "Documento de requisição de revisão não encontrado."}` |

</details>

<details>

<summary><code>POST</code> <code><b>/api/revision-request-document</b></code> <code>(Cria um documento de requisição de revisão)</code></summary>

#### • Auth (Nível de Acesso - Lawyer)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `file`  | required | File    | Arquivo da requisição de revisão |
> | `revisionRequestId` | required | number   | ID da requisição de revisão |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "revisionRequestDocument": CreadtedRevisionRequestDocument }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>PATCH</code> <code><b>/api/revision-request-document/:id</b></code> <code>(Atualiza um documento de requisição de revisão)</code></summary>

#### • Auth (Nível de Acesso - Lawyer)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID do documento de requisição de revisão |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `file`  | optional | File    | Arquivo da requisição de revisão |
> | `revisionRequestId` | optional | number   | ID da requisição de revisão |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "revisionRequestDocument": UpdatedRevisionRequestDocument }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg": "Documento de requisição de revisão não encontrado."}` |

</details>

<details>

<summary><code>DELETE</code> <code><b>/api/revision-request-document/:id</b></code> <code>(Deleta um documento de requisição de revisão)</code></summary>

#### • Auth (Nível de Acesso - Lawyer)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID do documento de requisição de revisão |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "revisionRequestDocument": DeletedRevisionRequestDocument }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

---

### • Resposta de revisão

<details>

<summary><code>GET</code> <code><b>/api/revision-responses</b></code> <code>(Retorna as respostas de revisão)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Query

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `title` | opcional | string  | Titulo da resposta de revisão |
> | `description` | opcional | string   | Descrição da resposta de revisão |
> | `process` | opcional | number   | ID do processo |
> | `revisionRequest` | opcional | number   | ID da requisição de revisão |
> | `withRevisionRequest` | opcional | bolean   | Trazer ou não dados da requisição de revisão |
> | `user` | opcional | number   | ID do usuário |
> | `withUser` | opcional | bolean   | Trazer ou não dados do usuário |
> | `limit` | opcional | number    | Limite de registros por página |
> | `page` | opcional | number    | Página |
> | `sort` | opcional | object   | Chaves de ordenação |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "revisionResponse": [RevisionResponse]}`      |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>GET</code> <code><b>/api/revision-response/:id</b></code> <code>(Retorna uma resposta de revisão)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID da resposta de revisão |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "revisionResponse": RevisionResponse}`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg": "Resposta de revisão não encontrada."}` |

</details>

<details>

<summary><code>POST</code> <code><b>/api/revision-response</b></code> <code>(Cria uma resposta de revisão)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `title`  | required | string  | Titulo da resposta de revisão |
> | `description`  | required | string | Descrição da resposta de revisão |
> | `revisionRequestId` | required | number   | ID da requisição de revisão |
> | `userId` | required | number   | ID do usuário |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "revisionResponse": CreadtedRevisionResponse }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>PATCH</code> <code><b>/api/revision-response/:id</b></code> <code>(Atualiza uma resposta de revisão)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID da resposta de revisão |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `title`  | optional | string  | Titulo da resposta de revisão |
> | `description`  | optional | string | Descrição da resposta de revisão |
> | `revisionRequestId` | required | number   | ID da requisição de revisão |
> | `userId` | required | number   | ID do usuário |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "revisionResponse": UpdatedRevisionResponse }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg": "Resposta de revisão não encontrada."}` |

</details>

<details>

<summary><code>DELETE</code> <code><b>/api/revision-response/:id</b></code> <code>(Deleta uma response de revisão)</code></summary>

#### • Auth (Nível de Acesso - Lawyer)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID da resposta de revisão |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "revisionResponse": DeletedRevisionResponse }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

---

### • Documentos de Resposta de revisão

<details>

<summary><code>GET</code> <code><b>/api/revision-response-documents</b></code> <code>(Retorna os documentos de resposta de revisão)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Query

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `revisionResponse` | opcional | number   | ID da resposta de revisão |
> | `withRevisionResponse` | opcional | bolean   | Trazer ou não dados da resposta de revisão |
> | `limit` | opcional | number    | Limite de registros por página |
> | `page` | opcional | number    | Página |
> | `sort` | opcional | object   | Chaves de ordenação |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "revisionResponseDocuments": [RevisionResponseDocument]}`      |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>GET</code> <code><b>/api/revision-response-document/:id</b></code> <code>(Retorna um documento de resposta de revisão)</code></summary>

#### • Auth (Nível de Acesso - Lawyers+)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID do documento de resposta de revisão |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"code": "200", "revisionResponseDocument": RevisionResponseDocument}`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg": "Documento de resposta de revisão não encontrado."}` |

</details>

<details>

<summary><code>POST</code> <code><b>/api/revision-response-document</b></code> <code>(Cria um documento de resposta de revisão)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `file`  | required | File    | Arquivo da resposta de revisão |
> | `revisionResponseId` | required | number   | ID da resposta de revisão |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "revisionResponseDocument": CreadtedRevisionResponseDocument }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

<details>

<summary><code>PATCH</code> <code><b>/api/revision-response-document/:id</b></code> <code>(Atualiza um documento de resposta de revisão)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID do documento de resposta de revisão |

#### • Body

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `file`  | optional | File    | Arquivo da resposta de revisão |
> | `revisionResponseId` | optional | number   | ID da resposta de revisão |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "revisionResponseDocument": UpdatedRevisionResponseDocument }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |
> | `404`     | `application/json` | `{"code":"404", "msg": "Documento de resposta de revisão não encontrado."}` |

</details>

<details>

<summary><code>DELETE</code> <code><b>/api/revision-response-document/:id</b></code> <code>(Deleta um documento de resposta de revisão)</code></summary>

#### • Auth (Nível de Acesso - Admin)

> | name    | type     | data type | description                     |
> | ------- | -------- | --------- | ------------------------------- |
> | `accessToken` | required | string    | Token de autorização do usuário |

#### • Parâmetros

> | name      | type     | data type | description                     |
> | --------- | -------- | --------- | ------------------------------- |
> | `id`   | required | number    | ID do documento de resposta de revisão |

#### • Respostas

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `201`     | `application/json` | `{"code": "201", "revisionResponseDocument": DeletedRevisionResponseDocument }`      |
> | `400`     | `application/json` | `{"code":"400", "msg":"Bad Request"}` |
> | `401`     | `application/json` | `{"code":"401", "msg":"Unauthorized"}` |

</details>

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir com este projeto:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença UNLICENSED. Para uso em produção, considere adicionar uma licença apropriada.

## 👥 Equipe de Desenvolvimento

Membros da equipe de desenvolvimento do projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/matheusssilva991">
        <img src="https://github.com/matheusssilva991.png" width="100px;" alt="Foto do Matheus S.Silva no GitHub"/><br>
        <b>Matheus S.Silva</b>
        <p>Desenvolvedor Back</p>
      </a>
    </td>
  </tr>
</table>

[⬆ Voltar ao topo](#topo)
