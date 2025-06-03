# ProjetoBackEnd - Serviço de Busca

Implementação de uma biblioteca em Node.js para um serviço de busca de websites, com armazenamento e consulta por palavras-chave.

## Instalação

1.  Clone o repositório.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Certifique-se de que uma instância do MongoDB esteja rodando localmente.

## Como Usar 

O arquivo index.js contém um exemplo prático de como utilizar a biblioteca. Você pode executá-lo diretamente para ver as funcionalidades de criação e busca em ação.

```bash
node index.js
```
## O script irá

1.    Conectar-se ao banco de dados MongoDB.
2.    Criar um novo registro de website.
3.    Realizar uma busca por palavra-chave e exibir os resultados.
4.    Desconectar-se do banco de dados.

## Funcionalidades da Biblioteca
A biblioteca website.js atualmente suporta as seguintes operações estáticas:

1.    Criar um website: Website.create(db, data)
2.    Buscar por palavra-chave: Website.findByKeyword(db, keyword)
3.    Deletar um website: Website.delete(db, url)
