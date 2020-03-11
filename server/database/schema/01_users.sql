DROP TABLE  IF EXISTS users;

CREATE TABLE users (
  id        SERIAL PRIMARY KEY NOT NULL,
  name      VARCHAR(255) NOT NULL,
  password  VARCHAR(255) NOT NULL,
  email     VARCHAR(355) UNIQUE NOT NULL
);

INSERT INTO users (name, password, email) VALUES ('Leo', '123', 'leo@email.com');
INSERT INTO users (name, password, email) VALUES ('Leo2', '123', 'leo2@email.com');
INSERT INTO users (name, password, email) VALUES ('Leo3', '123', 'leo3@email.com');