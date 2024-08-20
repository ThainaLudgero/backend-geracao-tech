# Backend Ecommerce
### Tecnologias utilizadas

  -Node.Js
  -Express
  -MySQL
  -Dotenv
  -Nodemon
  -Bcrypt
  -Jsonwebtoken
  -Sequelize
  -Swagger

###  Tecnologias utilizadas

- Node.Js
- Express
- MySQL
- Dotenv
- Nodemon
- Bcrypt
- Jsonwebtoken
- Sequelize
- Swagger

## Rodando o Back End (Servidor)

  1. Clonar o repositório do projeto
  2. git clone https://github.com/letticiamoura/ecommerce-backend.git

  3. Entrar na pasta

    cd ecommerce-backend

  5. Instalar depedências

    npm install

  6. Rodar o servidor
     
    npx nodemon src/server.js

## Configurando o BD
  1. Criar um banco de dados
  2. Criar as tabelas necesárias ou gerar pelo Sequelize automaticamente
   
  ```
   CREATE TABLE users (
    idusuarios int NOT NULL AUTO_INCREMENT,
    firstname varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
    surname varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
    email varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
    password varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    role enum('user','admin') COLLATE utf8mb4_unicode_ci DEFAULT 'user',
    PRIMARY KEY (idusuarios)
  )
  
  CREATE TABLE categories (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  slug varchar(50) NOT NULL,
  use_in_menu tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
)
  
  CREATE TABLE products (
    id int NOT NULL AUTO_INCREMENT,
    enabled tinyint(1) DEFAULT '0',
    name varchar(50) NOT NULL,
    slug varchar(50) NOT NULL,
    use_in_menu tinyint(1) DEFAULT '0',
    stock int DEFAULT '0',
    description varchar(100) DEFAULT NULL,
    price float NOT NULL,
    price_with_discount float NOT NULL,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NULL DEFAULT NULL,
    id_category int DEFAULT NULL,
    PRIMARY KEY (id),
    KEY idx_id_category (id_category),
    CONSTRAINT fk_id_category FOREIGN KEY (id_category) REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE
  )
  
  CREATE TABLE product_image (
    id int NOT NULL AUTO_INCREMENT,
    id_product int DEFAULT NULL,
    enabled tinyint(1) DEFAULT '0',
    path varchar(1000) NOT NULL,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NULL DEFAULT NULL,
    PRIMARY KEY (id),
    KEY id_product (id_product),
    CONSTRAINT product_image_ibfk_1 FOREIGN KEY (id_product) REFERENCES products (id)
  )
  
  CREATE TABLE products_options (
    id int NOT NULL AUTO_INCREMENT,
    id_product int NOT NULL,
    title varchar(100) NOT NULL,
    shape enum('square','circle') DEFAULT 'square',
    radius int DEFAULT '0',
    type enum('text','color') DEFAULT 'text',
    value varchar(100) NOT NULL,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY id_product (id_product),
    CONSTRAINT products_options_ibfk_1 FOREIGN KEY (id_product) REFERENCES products (id)
  ) 
  
  CREATE TABLE categories_product (
    id int NOT NULL AUTO_INCREMENT,
    id_product int NOT NULL,
    id_category int NOT NULL,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY id_product (id_product),
    KEY id_category (id_category),
    CONSTRAINT categories_product_ibfk_1 FOREIGN KEY (id_product) REFERENCES products (id),
    CONSTRAINT categories_product_ibfk_2 FOREIGN KEY (id_category) REFERENCES categories (id)
  ) 
```

4. Criar um arquivo <b>*.env*</b> na raiz do projeto.
5. Configurar o arquivo <b>*.env*</b> com os seguintes dados:
    ```
    DATABASE= "nome-do-seu-BD"
    USER= "seu-usuario-do-bd"
    PASSWORD= "sua-senha-do-bd"
    HOST=localhost
    ```
    
## Postman
[Arquivo Insomnia](https://drive.google.com/drive/folders/1ZnjkxpESr4ZVbakhccnpGFnZUVuCR959?usp=sharing) ↗
