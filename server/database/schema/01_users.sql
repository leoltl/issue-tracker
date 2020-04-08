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

INSERT INTO users (name, username, password, email, role) VALUES ('name_Admin', 'u_Admin', '$2b$10$b0xs1mINicg6fjT0TfFbTuP1VK2ZGp8lroybyrhmLd1Y.p3j3ZCuu', 'admin@email.com', 'admin');

INSERT INTO users (name, username, password, email, role) VALUES ('name_PM', 'u_PM', '$2b$10$b0xs1mINicg6fjT0TfFbTuP1VK2ZGp8lroybyrhmLd1Y.p3j3ZCuu', 'pm@email.com', 'pm');
INSERT INTO users (name, username, password, email, role) VALUES ('name_Dev', 'u_Dev', '$2b$10$b0xs1mINicg6fjT0TfFbTuP1VK2ZGp8lroybyrhmLd1Y.p3j3ZCuu', 'dev@email.com', 'dev');
INSERT INTO users (name, username, password, email, role) VALUES ('name_Tester', 'u_Tester', '$2b$10$b0xs1mINicg6fjT0TfFbTuP1VK2ZGp8lroybyrhmLd1Y.p3j3ZCuu', 'tester@email.com', 'tester');

INSERT INTO users (name, username, password, email, role) VALUES ('name_PM2', 'u_PM2', '$2b$10$b0xs1mINicg6fjT0TfFbTuP1VK2ZGp8lroybyrhmLd1Y.p3j3ZCuu', 'pm2@email.com', 'pm');
INSERT INTO users (name, username, password, email, role) VALUES ('name_Dev2', 'u_Dev2', '$2b$10$b0xs1mINicg6fjT0TfFbTuP1VK2ZGp8lroybyrhmLd1Y.p3j3ZCuu', 'dev2@email.com', 'dev');
INSERT INTO users (name, username, password, email, role) VALUES ('name_Tester2', 'u_Tester2', '$2b$10$b0xs1mINicg6fjT0TfFbTuP1VK2ZGp8lroybyrhmLd1Y.p3j3ZCuu', 'tester2@email.com', 'tester');