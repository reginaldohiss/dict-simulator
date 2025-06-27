# 💸 Simulador de DICT (API Pix)

API profissional desenvolvida com **Node.js + MongoDB** para simular o comportamento do **DICT** — o Diretório de Identificadores do sistema Pix. Permite criar, consultar, atualizar e desativar chaves Pix de forma segura, validada e documentada.

---

## 📌 Tabela de Conteúdo

- [📚 Sobre o Projeto](#-sobre-o-projeto)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🔧 Instalação e Execução](#-instalação-e-execução)
- [📮 Endpoints da API](#-endpoints-da-api)
- [🔒 Validações de Entrada](#-validações-de-entrada)
- [📘 Documentação Swagger](#-documentação-swagger)
- [✅ Testes Automatizados](#-testes-automatizados)
- [📂 Estrutura Modular](#-estrutura-modular)
- [📄 Licença](#-licença)

---

## 📚 Sobre o Projeto

O projeto tem como objetivo simular uma API DICT semelhante à usada pelo Banco Central no Pix, permitindo o gerenciamento de chaves de identificação como CPF, e-mail, telefone e chave aleatória.

---

## 📁 Estrutura do Projeto

```
dict-simulator/
├── src/                        # Código-fonte da API
│   ├── app/
│   │   ├── controllers/        # Lógica de controle de rotas
│   │   ├── formRequests/       # Validações de entrada
│   │   ├── repositories/       # Acesso a dados
│   │   ├── resources/          # Respostas e formatação
│   │   ├── services/           # Lógica de negócios
│   ├── models/                 # Modelos de dados
│   ├── routes/                 # Definição das rotas
│   ├── docs/                   # Documentação Swagger
│   └── app.js                  # Arquivo de configuração principal
├── tests/                      # Testes automatizados
├── .env                        # Arquivo de configuração de ambiente (excluído do Git)
├── .gitignore                  # Ignorar arquivos não necessários
├── README.md                   # Documentação principal
├── jest.config.js             # Configuração do Jest
├── server.js                   # Arquivo para inicializar o servidor
└── package.json                # Dependências e scripts do projeto
```

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Joi](https://joi.dev/) – Validações robustas
- [Swagger](https://swagger.io/) – Documentação
- [Jest](https://jestjs.io/) + [Supertest](https://github.com/visionmedia/supertest) – Testes automatizados

---

## 🔧 Instalação e Execução

### 1. Clone o repositório:

```bash
  git clone https://github.com/reginaldohiss/dict-simulator.git
  cd dict-simulator
```

### 2. Instale as dependências:

```bash
  npm install
```

### 3. Configure o ambiente:

Crie o arquivo `.env` ou renomear o `.env.example` com:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/dict-simulator
```

### 4. Inicie a aplicação:

```bash
  npm run dev
```

Acesse: `http://localhost:3000/api`

---

## 📮 Endpoints da API

| Método | Rota               | Descrição                      |
|--------|--------------------|--------------------------------|
| POST   | `/api/dict`        | Criar nova chave Pix           |
| GET    | `/api/dict/:chave` | Buscar chave Pix específica    |
| GET    | `/api/dict?nome=João`| Listar chaves por nome         |
| PUT    | `/api/dict/:chave` | Atualizar dados de uma chave   |
| DELETE | `/api/dict/:chave` | Desativar uma chave Pix        |

---

## 🔒 Validações de Entrada

Validações garantidas por [Joi](https://joi.dev/):

- **E-mail**: formato válido (`usuario@dominio.com`)
- **Telefone**: formato E.164 (`+5511987654321`)
- **CPF**: regex padrão (`000.000.000-00`)
- **Aleatória**: UUID v4
- Chave única
- Agência: 4 dígitos
- Conta: formato padrão brasileiro

---

## 📘 Documentação Swagger

Acesse:

```
http://localhost:3000/api/docs
```

Disponível com interface gráfica para testar e entender todos os endpoints da API.

---

## ✅ Testes Automatizados

Rodar todos os testes:

```bash
  npm run test
```

Utiliza:

- **MongoDB In-Memory**: sem afetar seu banco local
- **Jest** + **Supertest**: integração real da API

Testes incluídos:
- Criação de chave Pix
- Duplicidade
- Formato inválido
- Consulta de chaves

---

## 📂 Estrutura Modular

A arquitetura segue princípios profissionais:

- **Controller**: recebe requisições
- **FormRequest**: valida entradas
- **Service**: lógica de negócio
- **Repository**: acesso ao banco
- **Resource**: formatação de respostas

Separação de responsabilidades clara, ideal para crescimento e manutenção.

---

## 📄 Licença

Distribuído sob a licença MIT. Consulte `LICENSE` para mais detalhes.

---

> Desenvolvido com 💼 foco para desafios técnicos de alto nível.