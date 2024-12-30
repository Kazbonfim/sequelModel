# sequelModel/ProfileHub

[Ir para Passo 1](#passo-1-1-instalar-o-mysql)

[Ir para Passo 2](#1-2-clone-este-repositorio)

[Ir para Fotos da aplicação](#fotos-da-aplicacao-rodando-caso-tenha-duvidas)


**sequelModel** é um sistema simples desenvolvido para cadastrar e gerenciar dados de usuários. O projeto foi construído utilizando ferramentas básicas e recursos simples do **Node.js** para proporcionar uma introdução prática ao desenvolvimento de back-end.

A ideia inicial era criar uma hub pra administrar personagens de RPG; de certa forma, todos os modelos ainda podem serem adaptados pra isso, mas no momento estou focando em criar uma aplicação administrativa - por motivos óbvios, eu acho. Até o momento, é meu projeto mais completo, foi onde usei todos os recursos que vinha aprendendo até hoje.

## Funcionalidades

- Cadastro de usuários
- Edição e exclusão de registros de usuários
- Armazenamento e gerenciamento de dados utilizando um banco de dados simples (SQLite ou MySQL, conforme configuração)
- API RESTful para interagir com os dados

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Express**: Framework para construir a API e gerenciar as rotas.
- **Sequelize**: ORM (Object-Relational Mapping) para facilitar a interação com o banco de dados.
- **SQLite/MySQL**: Banco de dados para armazenamento dos dados dos usuários (totalmente configurável).
- **Bootstrap 5**: Framework CSS poderosa, com excelentes recursos visuais, de fácil aprendizado e manutenção.

## Em breve teremos

- **React**: Isso vai deixar tudo mais fluído, abandonando alguns recursos 'estáticos' que utilizei, como handlebars.
- **Electron**: Embora seja um projeto web, a ideia de ter um cliente/hub para personagens de RPG ainda está de pé, e nada melhor que um app desktop pra não ficar sempre dependente do navegador, e conexões á internet.

## Instalação

Resumindo, recomendo que sigam instalando primeiro o banco de dados que utilizei na construção inicial de tudo, mysql. Ele é bem simples de se utilizar, e conta com ferramentas visuais para manipular os dados; siga com calma, instalando o mysql primeiro, assim como o workbench, e em seguida prossiga clonando o projeto, e rodando localmente. Quaisquer problemas, ou sugestões, só entrar em contato através do e-mail: zcry.games@gmail.com.

# Passo 1.1 Instalar o MySQL

No Windows:

Baixe o instalador do MySQL em MySQL Community Downloads.

Execute o instalador e siga as instruções para completar a instalação.

Durante a instalação, escolha "Server only" e configure a senha do usuário root.

# No macOS:

Instale o Homebrew, se ainda não tiver:

    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

Instale o MySQL usando Homebrew:

    brew install mysql

Inicie o serviço MySQL:

    brew services start mysql

# No Linux (Ubuntu):

Atualize o sistema e instale o MySQL:

    sudo apt update



    sudo apt install mysql-server

Inicie o serviço MySQL:

    sudo service mysql start

Configure a senha do usuário root:

    sudo mysql_secure_installation

Passo 2: Configurar o MySQL

Acesse o MySQL como usuário root:

    mysql -u root -p

Crie um banco de dados para sua aplicação:

    CREATE DATABASE nome_do_banco_de_dados;

Crie um usuário e conceda permissões:

    CREATE USER 'nome_do_usuario'@'localhost' IDENTIFIED BY 'senha_do_usuario';



    GRANT ALL PRIVILEGES ON nome_do_banco_de_dados.* TO 'nome_do_usuario'@'localhost';



    FLUSH PRIVILEGES;

Saia do MySQL:

    EXIT;

## Opa! Pera aí 🤚
Agora que está com o banco de dados instalado, você precisa criar um arquivo chamando '.env', sim somente isso, sem nomes; ele deve ficar na RAÍZ do projeto, e nele você precisa carregar os dados do banco que criou anteriormente - não se preocupe, a ORM (Sequelize) vai tratar de configurar os demais dados de forma automática, assim que você instanciar a aplicação - explicado no final também.

# 1.2 Clone este repositório:

```bash
   git clone https://github.com/Kazbonfim/sequelModel.git
```

Clone este repositório:

```bash
   git clone https://github.com/Kazbonfim/sequelModel.git
```

Acesse o diretório do projeto:

```bash
   cd sequelModel
```

Instale as dependências:

```bash
   npm install
```

Configure o banco de dados no arquivo .env (IMPORTANTE!):
## Sem isso, a aplicação pode até iniciar, mas não terá um norte de onde conseguir os dados pra exibição, faça tudo com calma que deve funcionar.

```bash
makefile
Copiar código
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=sequel_model
Inicie o servidor:
```

```bash
npm start
```

Acesse a aplicação em http://localhost:3000 (ou a porta configurada).

# Fotos da aplicação rodando, caso tenha dúvidas:

![image](https://github.com/user-attachments/assets/f11b790d-1aa4-4d4d-b2d7-4db1a31c1d37)
![image](https://github.com/user-attachments/assets/c9b38f5d-7827-4f6b-a735-59283ff8979d)
![image](https://github.com/user-attachments/assets/0b6f5927-432e-48a6-825a-145d6b34491e)
![image](https://github.com/user-attachments/assets/56327b00-b920-458a-8f90-cc7c57867915)