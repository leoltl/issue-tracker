DROP TABLE IF EXISTS project_members;

CREATE TABLE project_members (
  project_id  INT REFERENCES projects(id) NOT NULL,
  user_id     INT REFERENCES users(id) NOT NULL
);