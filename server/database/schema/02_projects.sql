DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
  id    SERIAL PRIMARY KEY NOT NULL,
  name  VARCHAR(255) NOT NULL,
  projects_uuid uuid DEFAULT gen_random_uuid()
);

