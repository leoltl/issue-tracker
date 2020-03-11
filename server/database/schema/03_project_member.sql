DROP TABLE IF EXISTS project_members;

CREATE TABLE project_members (
  project_id  INT REFERENCES projects(id)ON DELETE CASCADE NOT NULL,
  user_id     INT REFERENCES users(id)ON DELETE CASCADE NOT NULL
);