# Reconhecimento Facial com TensorFlow.js e Face API 🚀

Este projeto visa desenvolver um sistema de reconhecimento facial utilizando os modelos pré-treinados do TensorFlow.js e a biblioteca Face API. O objetivo é criar uma solução eficaz e acessível, com foco na implementação direta no front end.

## Objetivo 🎯

O objetivo principal é criar um algoritmo de reconhecimento facial que seja economicamente viável e capaz de ser executado em dispositivos com processadores menos potentes, sem comprometer a precisão. Isso possibilitará a aplicabilidade do sistema em diversos contextos, desde que haja uma conexão estável disponível.

## Tecnologias Utilizadas ⚙️

Principais ferramentas e linguagens empregadas:

- [TensorFlow.js](https://www.tensorflow.org/js)
- [Face API](https://justadudewhohacks.github.io/face-api.js/docs/index.html)
- JavaScript
- PostgreSQL
- Node.js
- HTML
- CSS

## Como Começar 🚀

### Rodando o Projeto

1. **Clonar o repositório:**
    
    ```git clone https://github.com/NathanMarques2001/IC-face-recognition.git```

2. **Entre na pasta face-api:**

    ```cd face-api```

3. **Instalar as dependências:**

    ```npm install```

4. **Configurando variáveis de ambiente:**

    Crie um arquivo ```.env``` e adicione as informações necessárias para acessar o PostgreSQL. É importante que o banco de dados seja nomeado como ```ic_data_science```.

5. **Executar o servidor:**

    ```node index.js```

6. **Abrindo HTML**

    Utilizando a extensão do ```VSCode``` ```Live Server```. Abra o arquivo ```index.html```.

## Como Funciona o Sistema 🔍

O sistema de reconhecimento facial utiliza a distância euclidiana entre os pontos para verificar a similaridade entre as faces. Ao cadastrar uma face, o sistema extrai um vetor de características, representando os pontos importantes da face, e armazena esses vetores no banco de dados. Durante o reconhecimento facial, o sistema compara o vetor da face detectada com os vetores armazenados, calculando a distância euclidiana entre eles. Se a distância for menor que um determinado limiar, a face é reconhecida como uma correspondência.

## Demonstração do Vetor da Face Armazenado 📊

Aqui está um exemplo do vetor de características da face armazenado no banco de dados:

![Banco de Dados]()

Cada valor no vetor representa uma característica específica da face, como a posição dos olhos, nariz e boca.

## Funcionalidades 🛠️

- **Cadastro de Face:** Permite cadastrar faces para posterior reconhecimento.
- **Reconhecimento Facial:** Identifica rostos com base nos cadastros realizados.
- **Banco de Dados:** Armazena informações relevantes para o reconhecimento facial.

# Telas do Sistema 📱

Aqui estão algumas capturas de tela das telas principais do sistema:

1. **Página Principal:**
   ![Página Principal]()

2. **Página de Cadastro:**
   ![Página de Cadastro]()

3. **Usuário Cadastrado:**
   ![Usuário Cadastrado]()

4. **Página de Login:**
   ![Página de Login]()

5. **Página Logado**
   ![Página Principal]()

## Licença 📝

Este projeto está sob a licença [Apache](https://www.apache.org/licenses/).

## Contato ✉️

[nathanbrandao1@gmail.com](mailto:nathanbrandao1@gmail.com).
