# MyGastronomy API - Backend

Bem-vindo ao backend da aplicação MyGastronomy! Esta é uma API RESTful construída com Node.js, Express e MongoDB, projetada para gerenciar usuários, pratos e pedidos de um sistema de gastronomia.

## 📜 Visão Geral

O projeto consiste em uma API robusta que lida com a lógica de negócio e a persistência de dados. Ele inclui autenticação de usuários baseada em JWT, operações CRUD completas para as principais entidades da aplicação e uma arquitetura organizada em camadas (Rotas, Controladores, Acesso a Dados) para facilitar a manutenção e escalabilidade.

## ✨ Funcionalidades

-   **Autenticação de Usuários**: Cadastro (`signup`) e Login (`login`) com geração de token JWT.
-   **Gerenciamento de Usuários**: CRUD completo para usuários (leitura, atualização, exclusão).
-   **Gerenciamento de Pratos**: CRUD completo para pratos do cardápio (leitura, adição, atualização, exclusão).
-   **Gerenciamento de Pedidos**: Criação de novos pedidos associados a um usuário e a itens do cardápio.
-   **Filtros**: Rota específica para buscar apenas os pratos marcados como disponíveis.

## 🚀 Tecnologias Utilizadas

-   **Node.js**: Ambiente de execução JavaScript no servidor.
-   **Express.js**: Framework para construção da API e gerenciamento de rotas.
-   **MongoDB**: Banco de dados NoSQL para armazenar os dados.
    -   **MongoDB Native Driver**: Para interação direta com o banco de dados.
-   **Passport.js**: Middleware de autenticação (usando a estratégia `passport-local`).
-   **JSON Web Token (JWT)**: Para criação de tokens de sessão seguros.
-   **Dotenv**: Para gerenciamento de variáveis de ambiente.
-   **Nodemon**: Para reiniciar o servidor automaticamente durante o desenvolvimento.

## 📂 Estrutura do Projeto

O projeto segue uma arquitetura em camadas para uma clara separação de responsabilidades:

```
backend/
├── src/
│   ├── auth/
│   │   └── auth.js           # Lógica de autenticação e rotas de login/cadastro
│   ├── controllers/
│   │   ├── users.js          # Lógica de negócio para usuários
│   │   ├── plates.js         # Lógica de negócio para pratos
│   │   └── orders.js         # Lógica de negócio para pedidos
│   ├── data/
│   │   └── plateData.json    # Dados iniciais para popular o banco
│   ├── dataAccess/
│   │   ├── users.js          # Funções que interagem com a coleção 'users' no DB
│   │   ├── plates.js         # Funções que interagem com a coleção 'plates' no DB
│   │   └── orders.js         # Funções que interagem com a coleção 'orders' no DB
│   ├── database/
│   │   ├── mongo.js          # Configuração da conexão com o MongoDB
│   │   └── seed.js           # Script para popular o banco com dados iniciais
│   ├── helpers/
│   │   └── httpResponse.js   # Funções utilitárias para padronizar respostas HTTP
│   └── routes/
│       ├── users.js          # Definição das rotas da API para /users
│       ├── plates.js         # Definição das rotas da API para /plates
│       └── orders.js         # Definição das rotas da API para /orders
├── .env                      # Arquivo para variáveis de ambiente (NÃO ENVIAR PARA O GIT)
├── index.js                  # Ponto de entrada da aplicação
└── package.json              # Dependências e scripts do projeto
```

## 🛠️ Instalação e Configuração

Siga os passos abaixo para rodar o projeto localmente.

### Pré-requisitos
-   [Node.js](https://nodejs.org/) (versão 18 ou superior)
-   [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
-   Uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) para obter a connection string do banco.

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio>
    ```

2.  **Navegue até a pasta do backend:**
    ```bash
    cd my-gastronomy/backend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Crie o arquivo de variáveis de ambiente:**
    Crie um arquivo chamado `.env` na raiz da pasta `backend` e copie o conteúdo do exemplo abaixo, substituindo pelos seus próprios valores.

    **`.env.example`**
    ```env
    # String de conexão do seu cluster no MongoDB Atlas
    MONGO_CS="mongodb+srv://<user>:<password>@cluster-url.net/"

    # Nome do seu banco de dados
    MONGO_DB_NAME="MyGastronomy"

    # Segredo para gerar os tokens JWT (use um gerador de string aleatória)
    JWT_SECRET="seu_segredo_super_secreto_aqui"

    # Porta em que o servidor irá rodar
    PORT=3000
    ```

## 🏃‍♀️ Rodando a Aplicação

1.  **(Opcional, mas recomendado) Popule o banco de dados** com os dados de pratos do arquivo `plateData.json`. Execute este comando uma vez.
    ```bash
    npm run seed
    ```

2.  **Inicie o servidor em modo de desenvolvimento:**
    O servidor irá reiniciar automaticamente a cada alteração no código.
    ```bash
    npm run dev
    ```
    O servidor estará disponível em `http://localhost:3000`.

## Endpoints da API

Aqui está uma lista das rotas disponíveis na API.

| Método HTTP | Rota                 | Descrição                                 |
| :---------- | :------------------- | :---------------------------------------- |
| `POST`      | `/auth/signup`       | Registra um novo usuário.                 |
| `POST`      | `/auth/login`        | Autentica um usuário e retorna um token JWT. |
| `GET`       | `/users`             | Retorna uma lista de todos os usuários.     |
| `PUT`       | `/users/:id`         | Atualiza os dados de um usuário específico. |
| `DELETE`    | `/users/:id`         | Deleta um usuário específico.             |
| `GET`       | `/plates`            | Retorna uma lista de todos os pratos.      |
| `GET`       | `/plates/availables` | Retorna uma lista apenas dos pratos disponíveis. |
| `POST`      | `/plates`            | Adiciona um novo prato.                   |
| `PUT`       | `/plates/:id`        | Atualiza os dados de um prato específico. |
| `DELETE`    | `/plates/:id`        | Deleta um prato específico.               |
| `POST`      | `/orders`            | Cria um novo pedido.                      |
| `GET`       | `/orders`            | Retorna uma lista de todos os pedidos.     |

---

_Criado em: 12 de Setembro de 2025_