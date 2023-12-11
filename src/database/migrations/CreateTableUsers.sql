CREATE TABLE if not exists users (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(70) UNIQUE not null
);
