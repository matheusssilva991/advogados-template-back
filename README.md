# Advogados template - Back

<span id="topo"></span>

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

<img src="./assets/scaleIcon.svg" alt="Capa" width="35%">

> Sistema de gestão de processos de advogados

## 🚩 Informações do projeto

<!-- Deixe apenas um -->

<!-- ![Status do projeto](https://img.shields.io/badge/status-fazendo-green) -->
<!-- ![Status do projeto](https://img.shields.io/badge/status-pausado-yellow) -->
![Status do projeto](https://img.shields.io/badge/status-finalizado-red)

A criação de um sistema de gerenciamento de processos de advogados.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

<!-- Estes são apenas requisitos de exemplo. Adicionar, duplicar ou remover conforme necessário -->

- Você instalou a versão mais recente de `<linguagem / dependência / requeridos>`
- Você tem uma máquina `<Windows / Linux / Mac>`. Indique qual sistema operacional é compatível / não compatível.
- Você leu `<guia / link / documentação_relacionada_ao_projeto>`.

## 🚀 Instalando <AdvogadosTemplate>

Para instalar o <AdvogadosTemplate>, siga estas etapas:

Linux:

Primeiro, certifique-se que tenha o node e npm em sua máquina

```bash
Node.js -v && npm --version 
```

Caso não tenha o node e npm em sua máquina, utilize o comando

```bash
sudo apt install node 
sudo apt install npm 
```

Em seguida, instale o nest CLI

```bash
npm i -g @nestjs/cli
```

Depois Rode os seguintes comandos para instalar as dependências do projeto:

```bash
npm i
```

Depois, renomeie o arquivo .env-example para .env e configure as variáveis de ambiente.

## ☕ Usando <AdvogadosTemplate>

Para rodar o projeto:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Para acessar as rotas do projeto:

### • Login

<details>
<summary><code>POST</code> <code><b>/login</b></code> <code>(Autentica o usuário e salva o token no cookie)</code></summary>

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

## 🤝 Equipe

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
