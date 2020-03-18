DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
  id    SERIAL PRIMARY KEY NOT NULL,
  name  VARCHAR(255) NOT NULL
);

INSERT INTO projects (name) VALUES ('test project');