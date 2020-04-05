DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS user_role;
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE user_role AS ENUM('admin', 'pm', 'dev', 'tester');

CREATE TABLE users (
  id        SERIAL PRIMARY KEY NOT NULL,
  name      VARCHAR(255) NOT NULL,
  username  VARCHAR(255) UNIQUE NOT NULL,
  password  VARCHAR(255) NOT NULL,
  email     VARCHAR(355) UNIQUE NOT NULL,
  role      user_role NOT NULL,
  users_uuid uuid DEFAULT gen_random_uuid()
);

INSERT INTO users (name, username, password, email, role) VALUES ('Leo', 'leoltl', '123', 'leo@email.com', 'admin');
INSERT INTO users (name, username, password, email, role) VALUES ('Leo2', 'leoltl2', '123', 'leo2@email.com', 'pm');
INSERT INTO users (name, username, password, email, role) VALUES ('Leo3', 'leoltl3', '123', 'leo3@email.com', 'dev');