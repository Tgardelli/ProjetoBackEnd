# ProjetoBackEnd - Serviço de Busca

Implementação de uma biblioteca em Node.js para um serviço de busca de websites, com armazenamento e consulta por palavras-chave.

## Instalação

1.  Clone o repositório.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Certifique-se de que uma instância do MongoDB esteja rodando localmente.

## Como Usar (CLI)

-   **Criar um website:**
    ```bash
    node index.js create --url="[https://utfpr.edu.br](https://utfpr.edu.br)" --title="UTFPR" --keywords "universidade" "tecnologia"
    ```

-   **Buscar por palavra-chave:**
    ```bash
    node index.js find --keyword="tecnologia"
    ```

-   **Atualizar um website:**
    ```bash
    node index.js update --url="[https://utfpr.edu.br](https://utfpr.edu.br)" --newTitle="Universidade Tecnológica Federal do Paraná"
    ```

-   **Deletar um website:**
    ```bash
    node index.js delete --url="[https://utfpr.edu.br](https://utfpr.edu.br)"
    ```
