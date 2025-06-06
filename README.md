# ProjetoBackEnd - Serviço de Busca

Este é um serviço de busca em Node.js que permite indexar websites e pesquisá-los por palavras-chave. O projeto utiliza o MongoDB para armazenamento de dados e fornece uma interface de linha de comando (CLI) interativa para teste e uso.

## Arquitetura do Projeto

O projeto é modularizado para separar as responsabilidades:

* **`index.js`**: Ponto de entrada da aplicação. Inicia a interface de linha de comando (CLI) para interagir com o sistema.
* **`database.js`**: Gerencia a conexão com o banco de dados MongoDB.
* **`website.js`**: Contém a lógica de negócio principal para criar, buscar e deletar websites.
* **`keyword.js`**: Gerencia a lógica de criação e contagem de referências de palavras-chave.
* **`user.js`**: Responsável por gerenciar usuários (convidados) e registrar suas atividades de busca.
* **`logger.js`**: Um logger simples para registrar erros em um arquivo `errors.log`.

## Instalação

1.  **Clone o repositório.**
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Pré-requisitos:**
    * Certifique-se de que uma instância do MongoDB esteja em execução no endereço `mongodb://localhost:27017`.

## Como Usar

O arquivo `index.js` fornece uma CLI interativa para usar as funcionalidades da biblioteca.

Para iniciar, execute:
```bash
node index.js
```
A CLI apresentará um menu com as seguintes opções:
1.  **Adicionar Website:** Solicita URL, título, descrição e palavras-chave para indexar um novo site.
2.  **Buscar Websites:** Permite buscar por uma palavra-chave ou por uma URL específica (usando o prefixo `url:`).
3.  **Deletar Website:** Remove um website do índice através de sua URL.
4.  **Sair:** Encerra a aplicação e desconecta do banco de dados.

## Funcionalidades da Biblioteca (`website.js`)

A biblioteca oferece as seguintes funcionalidades principais através de métodos estáticos na classe `Website`:

* `Website.create(db, data)`: Cria um novo registro de website.
    * **Parâmetros:**
        * `db`: A instância do banco de dados.
        * `data`: Um objeto contendo `url`, `title`, `description` (opcional) e `keywords` (string separada por vírgulas ou array de strings).
    * **Retorna:** O ID do website inserido.

* `Website.findByKeyword(db, keyword)`: Busca websites que contenham uma determinada palavra-chave.
    * **Parâmetros:**
        * `db`: A instância do banco de dados.
        * `keyword`: A palavra-chave a ser buscada.
    * **Retorna:** Uma lista de websites correspondentes.

* `Website.delete(db, url)`: Deleta um website com base na sua URL.
    * **Parâmetros:**
        * `db`: A instância do banco de dados.
        * `url`: A URL do website a ser deletado.
    * **Retorna:** `true` se a deleção for bem-sucedida.
